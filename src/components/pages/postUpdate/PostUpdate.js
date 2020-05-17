import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import moment from 'moment'
import './PostUpdate.scss'

import { LoadingPage, Page } from '../..'

import api from '../../../api'
import { useApi } from '../../../hooks/useApi'
import { UIContext } from '../../../context'
import { queueMessages } from '../../../actions'

export const PostUpdate = (props) => {
  // Router history object
  const history = useHistory()

  // UI context dispatch
  const [, uiDispatch] = useContext(UIContext)

  // Ensure that a number is supplied as id
  const params = useParams()
  const id = Number(params.id)

  // Get post from API
  const [post, error] = useApi('get', 'posts', id)

  // HTML input state
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // Update the HTML input state after post is loaded
  useEffect(() => {
    // don't run until post exists
    if (!post) return

    // update state with post data
    setTitle(post.title)
    setContent(post.content)
  }, [post])

  /**
   * Updates post and then redirects to PostDetail with success message
   */
  const save = async () => {
    await api.service('posts').patch(id, { title, content })
    uiDispatch(queueMessages([{
      type: 'success',
      content: 'Post saved!'
    }]))
    history.push(`/post/${id}`)
  }

  /**
   * Returns user to previous page
   */
  const cancel = () => {
    history.goBack()
  }

  // Return an empty page with error messages if there's an error
  if (error) {
    return <Page messages={[error]} />
  }

  // Return loading page when post is loading
  if (!post) {
    return <LoadingPage />
  }

  // Fix weird space before UTC offset
  post.updatedAt = post.updatedAt.replace(' +', '+')
  const updatedAt = moment(post.updatedAt)

  // Post is loaded with no errors, user has not saved or cancelled
  return (
    <Page>
      <header className='page-title'>
        <h2>Update your post</h2>
        <h3 className='text-secondary-light'>
          Last Updated {updatedAt.calendar()}
        </h3>
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
