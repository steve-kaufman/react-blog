import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import './PostList.scss'

import { LoadingPage, Post, Page } from '../..'

import { useApi } from '../../../hooks/useApi'

export const PostList = () => {
  // Get user email from params
  const params = useParams()
  const [usersQuery, setUsersQuery] = useState(null)
  const [postsQuery, setPostsQuery] = useState(null)

  // Get user from email
  const [
    usersResult, 
    usersError, 
    setUsers, 
    setUsersError
  ] = useApi('find', 'users', usersQuery)

  // Get posts and potential errors from API
  const [
    posts, 
    postsError, 
    setPosts, 
    setPostsError
  ] = useApi('find', 'posts', postsQuery)

  useEffect(() => {
    // If a user email is specified, get the user, else get all posts
    const { email } = params
    if (email) {
      setUsersQuery({ query: { email } })
      setPostsQuery(null)
    } else {
      setPostsQuery(undefined)
      setUsersQuery(null)
    }
    // Reset posts and error to make sure they reload
    setPosts(null)
    setPostsError(false)
    // Reset users and error to make sure it reloads
    setUsers(null)
    setUsersError(false)
  }, [params, setPosts, setPostsError, setUsers, setUsersError])

  useEffect(() => {
    // If a user has been loaded, get that user's posts
    if (usersResult) {
      const user = usersResult[0]
      setPostsQuery({ query: { userId: user.id } })
    }
  }, [usersResult])

  // If there's an error return blank page
  if (postsError || usersError) {
    return <Page />
  }

  // If posts aren't loaded return loading page
  if (!posts) {
    return <LoadingPage />
  }

  /* Posts are loaded! */

  // Get current date and time
  const currentTime = moment().format('MMMM Do YYYY, h:mm a')

  return (
    <Page>
      <header className='page-title'>
        <h2>Recent Posts:</h2>
        <h4 className='text-secondary-light'>{currentTime}</h4>
      </header>
      {posts.map((post, i) => (
        <Post post={post} isShort key={i} />
      ))}
    </Page>
  )
}
