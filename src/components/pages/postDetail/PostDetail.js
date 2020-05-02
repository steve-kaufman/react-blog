import React from 'react'
import { useParams } from 'react-router-dom'
import './PostDetail.scss'

import { LoadingPage, Page, Post } from '../..'

import { useApi } from '../../../hooks/useApi'

export const PostDetail = (props) => {
  // Ensure that a number is supplied as id
  const params = useParams()
  const id = Number(params.id)

  // Get post from API
  const [post, error] = useApi('get', 'posts', id)

  if (error) {
    return <Page messages={[error]} />
  }

  if (!post) {
    return <LoadingPage />
  }

  return (
    <Page>
      <div className='page-title'>
        <h3 style={{ marginBottom: '0.5rem' }}>Post by {post.user.email}</h3>
        <h3 className='text-secondary-light'>Created at 3:00 PM</h3>
      </div>
      <Post post={post} />
    </Page>
  )
}
