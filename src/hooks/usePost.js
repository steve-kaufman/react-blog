import { useState, useEffect } from 'react'
import api from '../api'

export const usePost = (initialPost, auth) => {
  // Keep track of post
  const [post, setPost] = useState(initialPost)

  // Thumbs up/down state
  const [thumbs, setThumbs] = useState({ up: false, down: false })

  // Likes and dislikes state
  const [likes, setLikes] = useState(null)
  const [dislikes, setDislikes] = useState(null)

  useEffect(() => {
    if (!post) return

    if (post.title === 'Post 1') console.log(post.userLiked)

    setThumbs({
      up: post.userLiked?.like === 1,
      down: post.userLiked?.like === 0
    })
    setLikes(post.likes)
    setDislikes(post.dislikes)
  }, [post])

  useEffect(() => {
    const updatePost = async () => {
      setPost(await api.service('posts').get(post.id))
    }
    updatePost()
  }, [auth.user, post.id])

  /** 
   * Toggle thumbs 'up' or 'down'
   */
  const toggleThumb = async (thumb) => {
    // if not logged in, do nothing
    if (!auth.user) return

    if (thumbs[thumb]) {
      // Remove like object
      await api.service('likes').remove(post.userLiked.id)
      // Reload post
      const newPost = await api.service('posts').get(post.id)
      setPost(newPost)
    } else {
      // create a like if thumbs-up was clicked, else create a dislike
      const like = thumb === 'up'
      // Create like object
      await api.service('likes').create({ like, postId: post.id })
      // Reload post
      const newPost = await api.service('posts').get(post.id)
      setPost(newPost)
    }
  }

  return { 
    thumbs, 
    toggleThumb,
    likes,
    dislikes
  }
}