import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import './PostDetail.scss';

import { Post } from '../..' 
import { Page } from '../..'

import { PostContext } from '../../../context'
 
export const PostDetail = (props) => {
  // Get posts from PostContext
  const [posts] = useContext(PostContext)

  const params = useParams()
  // Ensure that a number is supplied as id
  const id = Number(params.id)

  // Look for post matching route id
  const post = posts.find(post => post.id === id)

  const { title, content, author } = post

  return (
    <Page>
      <div className="page-title">
        <h2>Post by {author.email}</h2>
        <h3>Created at 3:00 PM</h3>
      </div>
      <Post id={id} title={title} content={content} author={author} />
    </Page>
  )
}
