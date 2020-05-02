import React from 'react'
import moment from 'moment'
import './PostList.scss'

import { LoadingPage, Post, Page } from '../..'

import { useApi } from '../../../hooks/useApi'

export const PostList = () => {
  // Get posts and potential errors from API
  const [posts, error] = useApi('find', 'posts')

  // If there's an error return a blank page with error messages
  if (error) {
    return <Page messages={[error]} />
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
