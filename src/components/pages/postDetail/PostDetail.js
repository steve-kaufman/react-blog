import React from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import './PostDetail.scss'

import { LoadingPage, Page, Post } from '../..'

import { useApi } from '../../../hooks/useApi'

export const PostDetail = (props) => {
  // Ensure that a number is supplied as id
  const params = useParams()
  const id = Number(params.id)

  // Get post and potential errors from API
  const [post, error] = useApi('get', 'posts', id)


  // If there's an error return a blank page with error messages
  if (error) {
    return <Page messages={[error]} />
  }

  // If posts aren't loaded return loading page
  if (!post) {
    return <LoadingPage />
  }

  /* Post is loaded! */

  // Fix weird space before UTC adjustment
  post.updatedAt = post.updatedAt.replace(' +', '+')
  const updatedAt = moment(post.updatedAt)

  return (
    <Page>
      <div className='page-title'>
        <h3 style={{ marginBottom: '0.5rem' }}>Post by {post.user.email}</h3>
        <h3 className='text-secondary-light'>
          Last Updated {updatedAt.calendar()}
        </h3>
      </div>
      <Post post={post} />
    </Page>
  )
}
