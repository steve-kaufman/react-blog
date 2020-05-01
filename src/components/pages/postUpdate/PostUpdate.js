import React, { useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import './PostUpdate.scss'

import { LoadingPage, Page } from '../..'

// import { PostContext } from '../../../context'

// import { updatePost } from '../../../actions'
import api from '../../../api'

export const PostUpdate = (props) => {
  // Ensure that a number is supplied as id
  const params = useParams()
  const id = Number(params.id)

  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const [saved, setSaved] = useState(false)
  const [cancelled, setCancelled] = useState(false)

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

  useEffect(() => {
    if (!post) return

    setTitle(post.title)
    setContent(post.content)
  }, [post])

  const save = () => {
    // dispatch(updatePost(id, title, content))
    api.service('posts').patch(id, {
      title, content
    }).then(() => {
      setSaved(true)
    })
  }

  const cancel = () => {
    setCancelled([])
  }

  if (!post) {
    return <LoadingPage />
  }

  if (error) {
    return <Page messages={[error]} />
  }

  if (saved || cancelled) {
    const messages = saved ? [{
      type: 'success',
      content: 'Post saved!'
    }] : []

    return (
      <Redirect
        to={{
          pathname: `/post/${id}`,
          state: { messages }
        }}
      />
    )
  }

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
