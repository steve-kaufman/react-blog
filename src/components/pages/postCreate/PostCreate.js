import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import './PostCreate.scss';

import { Page } from '../..'

import { AuthContext } from '../../../context'

// import { createPost } from '../../../actions'
import api from '../../../api'
 
export const PostCreate = (props) => {
  // const [posts, dispatch] = useContext(PostContext)
  const [auth] = useContext(AuthContext)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [saved, setSaved] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  const [postId, setPostId] = useState(null)

  const save = () => {
    // dispatch(createPost(title, content, user))
    api.service('posts').create({
      title, content
    }).then(post => {
      setPostId(post.id)
      setSaved(true)
    })
  }

  const cancel = () => {
    setCancelled(true)
  }

  if (!auth.user) {
    return <Redirect to={{
      pathname: '/login',
      state: { messages: [{
        type: 'info',
        content: 'You must log in to create a post!'
      }] }
    }} />
  }

  if (saved) {
    const messages = [{
      type: 'success',
      content: 'Post saved!'
    }]

    return <Redirect to={{
      pathname: `/post/${postId}`,
      state: { messages }
    }} />
  }

  if (cancelled) {
    return <Redirect to='/' />
  }

  return (
    <Page>
      <header className="page-title">
        <h2>New Post</h2>
        <h3>Say what's on your mind:</h3>
      </header>
      <div className="title-form">
        <h3>Title:</h3>
        <input 
          className="title-input" 
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="content-form">
        <h3>Content:</h3>
        <textarea 
          className="content-input" 
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>
      <div className="controls">
        <button className="btn save-btn" onClick={save}>Save</button>
        <button className="btn cancel-btn" onClick={cancel}>Cancel</button>
      </div>
    </Page>
  )
}
