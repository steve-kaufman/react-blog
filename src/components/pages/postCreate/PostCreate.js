import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import './PostCreate.scss';

import { Page } from '../..'

import { AuthContext, PostContext } from '../../../context'

import { createPost } from '../../../actions'
 
export const PostCreate = (props) => {
  const [posts, dispatch] = useContext(PostContext)
  const [auth] = useContext(AuthContext)
  // Ensure that a number is supplied as id
  const { user } = auth

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [saved, setSaved] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  const save = () => {
    dispatch(createPost(title, content, user))
    setSaved(true)
  }

  const cancel = () => {
    setCancelled([])
  }

  if (saved || cancelled) {
    const messages = saved ? ['Post saved!'] : []

    const id = posts[posts.length - 1].id

    return <Redirect to={{
      pathname: `/post/${id}`,
      state: { messages }
    }} />
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
