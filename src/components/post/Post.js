import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import './Post.scss'

import thumbsOUp from '@iconify/icons-fa/thumbs-o-up'
import thumbsUp from '@iconify/icons-fa/thumbs-up'
import thumbsODown from '@iconify/icons-fa/thumbs-o-down'
import thumbsDown from '@iconify/icons-fa/thumbs-down'

import pencilIcon from '@iconify/icons-fa/pencil'

import { AuthContext } from '../../context'
import api from '../../api'

// Handles state of thumbs up/down
const useLikeState = (post, auth) => {
  // Keep track of like object id
  const [likeId, setLikeId] = useState(null)

  // Thumbs up/down state
  const [thumbs, setThumbs] = useState({ up: false, down: false })

  useEffect(() => {
    if (!post) return
    if (!post.userLiked) return

    setLikeId(post.userLiked.id)
    setThumbs({
      up: post.userLiked.like === 1,
      down: post.userLiked.like === 0
    })
  }, [post])

  // Toggle thumbs 'up' or 'down'
  const toggleThumb = async (thumb) => {
    // if not logged in, do nothing
    if (!auth.user) return

    if (thumbs[thumb]) {
      // Remove like object
      await api.service('likes').remove(likeId)
      // Thumb is neither up or down
      setThumbs({ ...thumbs, [thumb]: false })
    } else {
      // Create like object
      const result = await api.service('likes').create({
        like: true,
        postId: post.id
      })
      // Set thumb up/down
      setThumbs({ ...thumbs, [thumb]: true })
      // Keep track of new like object id
      setLikeId(result.id)
    }
  }

  return [thumbs, toggleThumb]
}

export const Post = (props) => {
  // destructure props
  const { post, isShort, style } = props
  // destructure post information
  const { id, title, content, user } = post

  // User authentication context
  const [auth] = useContext(AuthContext)

  // Create like state
  const [thumbs, toggleThumb] = useLikeState(post, auth)

  // Determine if logged in user is the author
  const isAuthor = (auth.user) // Is user logged in?
    ? (auth.user.id === user.id) // Does user match post author?
    : false

  // If logged in user is author, add an edit-post link
  const editLink = isAuthor ? (
    <Link to={`/post/edit/${id}`}>
      <Icon
        icon={pencilIcon}
        width='1.2rem' height='1.2rem'
      />
    </Link>
  ) : null

  return (
    <article className='post' style={style}>
      <header className='post-header'>
        {editLink}
        <span className='author-link link'>{user.email}</span>
      </header>
      <aside className='post-controls'>
        <span className='btn' onClick={() => { toggleThumb('up') }}>
          <Icon
            icon={thumbs.up ? thumbsUp : thumbsOUp}
            width='1.5rem' height='1.5rem'
          />
        </span>
        <span className='btn' onClick={() => { toggleThumb('down') }}>
          <Icon
            icon={thumbs.down ? thumbsDown : thumbsODown}
            width='1.5rem' height='1.5rem'
          />
        </span>
      </aside>
      <div className={'post-content' + (isShort ? ' short' : '')}>
        <Link to={`/post/${id}`}>
          <h3 className='post-title link'>{title}</h3>
        </Link>
        <p>{content}</p>
      </div>
    </article>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired
}
