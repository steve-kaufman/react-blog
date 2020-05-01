import React, { useState, useContext } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import './PostUpdate.scss';

import { Page } from '../..'

import { PostContext } from '../../../context'

import { updatePost } from '../../../actions'
 
export const PostUpdate = (props) => {
  const [posts, dispatch] = useContext(PostContext)
  // Ensure that a number is supplied as id
  const params = useParams()
  const id = Number(params.id)

  const post = posts.find(post => post.id === id)

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const [saved, setSaved] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  const save = () => {
    dispatch(updatePost(id, title, content))
    setSaved(true)
  }

  const cancel = () => {
    setCancelled([])
  }

  if (saved || cancelled) {
    const messages = saved ? [{ 
      type: 'success', 
      content: 'Post saved!'
    }] : []

    return <Redirect to={{
      pathname: `/post/${id}`,
      state: { messages }
    }} />
  }

  return (
    <Page>
      <header className="page-title">
        <h2>Update your post</h2>
        <h3>Last change made at 3:00 PM</h3>
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
