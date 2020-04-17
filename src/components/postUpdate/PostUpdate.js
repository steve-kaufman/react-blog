import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import './PostUpdate.scss';

import { Page } from '..'

import { PostContext } from '../../context/PostContext'

import { updatePost } from '../../actions'
 
export const PostUpdate = (props) => {
  // Get posts from PostContext
  const [posts, dispatch] = useContext(PostContext)
  // Ensure that a number is supplied as id
  const id = Number(props.match.params.id)
  // Look for post matching route id
  const post = posts.find(post => post.id === id)

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const [done, setDone] = useState(false)

  const save = () => {
    dispatch(updatePost(id, title, content))
    setDone(true)
  }

  const cancel = () => {
    setDone(true)
  }

  if (done) {
    return <Redirect to={`/post/${id}`} />
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
