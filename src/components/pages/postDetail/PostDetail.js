import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './PostDetail.scss';

import { LoadingPage, Page, Post } from '../..'
import api from '../../../api';

// import { PostContext } from '../../../context'
 
export const PostDetail = (props) => {
  const [post, setPost] = useState(null)
  const [messages, setMessages] = useState(null)

  const params = useParams()
  // Ensure that a number is supplied as id
  const id = Number(params.id)

  useEffect(() => {
    api.service('posts').get(id)
      .then(result => {
        setPost(result)
      })
      .catch(() => {
        setMessages([{
          type: 'info',
          content: "I'm sorry, we can't find that post!"
        }])
      })
  }, [id])

  if (messages) {
    return <Page messages={messages} />
  }

  if (!post) {
    return <LoadingPage />
  }

  const { title, content, user } = post

  return (
    <Page>
      <div className="page-title">
        <h2>Post by {user.email}</h2>
        <h3>Created at 3:00 PM</h3>
      </div>
      <Post id={id} title={title} content={content} author={user} />
    </Page>
  )
}
