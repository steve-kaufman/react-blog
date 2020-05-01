import React, { useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import './PostUpdate.scss'

import { LoadingPage, Page } from '../..'

import api from '../../../api'

export const PostUpdate = (props) => {
  // Ensure that a number is supplied as id
  const params = useParams()
  const id = Number(params.id)

  // State for loading post
  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)

  // HTML input state
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // UI state
  const [saved, setSaved] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  // Fetch the post on mount
  useEffect(() => {
    api.service('posts').get(id)
      .then(post => {
        setPost(post)
      })
      .catch(() => {
        setError({
          type: 'info',
          content: 'That post does not exist'
        })
      })
  }, [id])

  // Update the HTML input state after post is loaded
  useEffect(() => {
    // don't run on mount
    if (!post) return

    // update state with post data
    setTitle(post.title)
    setContent(post.content)
  }, [post])

  // Run when saved button is clicked
  const save = () => {
    api.service('posts').patch(id, {
      title, content
    }).then(() => {
      setSaved(true)
    })
  }

  // Run when cancel button is clicked
  const cancel = () => {
    setCancelled(true)
  }

  // Return loading page when post is loading
  if (!post) {
    return <LoadingPage />
  }

  // Return an empty page with error messages if there's an error
  if (error) {
    return <Page messages={[error]} />
  }

  // Redirect to PostDetail with success message when post is saved
  if (saved) {
    const messages = [{
      type: 'success',
      content: 'Post saved!'
    }]

    return (
      <Redirect
        to={{
          pathname: `/post/${id}`,
          state: { messages }
        }}
      />
    )
  }

  // Redirect to PostDetail with no message when cancelled
  if (cancelled) {
    return <Redirect to={`/post/${id}`} />
  }

  // Post is loaded with no errors, user has not saved or cancelled
  return (
    <Page>
      <header className='page-title'>
        <h2>Update your post</h2>
        <h3>Last change made at 3:00 PM</h3>
      </header>
      <div className='title-form'>
        <h3>Title:</h3>
        <input
          className='title-input'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className='content-form'>
        <h3>Content:</h3>
        <textarea
          className='content-input'
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>
      <div className='controls'>
        <button className='btn save-btn' onClick={save}>Save</button>
        <button className='btn cancel-btn' onClick={cancel}>Cancel</button>
      </div>
    </Page>
  )
}
