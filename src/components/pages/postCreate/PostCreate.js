import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './PostCreate.scss';

import { Page } from '../..'

import { AuthContext, UIContext } from '../../../context'

import api from '../../../api'
import { queueMessages } from '../../../actions';
 
export const PostCreate = (props) => {
  // Router history object
  const history = useHistory()

  // Auth context state
  const [auth] = useContext(AuthContext)
  // UI context dispatch
  const [, dispatch] = useContext(UIContext)

  // Input state
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  /**
   * Creates new post and redirects user to PostDetail
   */
  const save = async () => {
    const post = await api.service('posts').create({
      title, content
    })

    dispatch(queueMessages([{
      type: 'success',
      content: 'Post saved!'
    }]))

    history.push(`/post/${post.id}`)
  }

  /**
   * Returns user to previous page
   */
  const cancel = () => {
    history.goBack()
  }

  /**
   * Redirects user to login page if not authenticated
   */
  useEffect(() => {
    if (!auth.user) {
      history.replace('/login')
      return () => {
        dispatch(queueMessages([{
          type: 'info',
          content: 'You must log in to create a post!'
        }]))
      }
    }
  }, [auth.user, dispatch, history])

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
