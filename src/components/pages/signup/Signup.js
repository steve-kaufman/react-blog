import React, { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Signup.scss'

import api from '../../../api'

import { Page } from '../..'

import { AuthContext, UIContext } from '../../../context'
import { queueMessages, setMessages } from '../../../actions'

export const Signup = () => {
  // Router history object
  const history = useHistory()

  // Auth context state
  const [auth] = useContext(AuthContext)
  // UI context dispatch
  const [, uiDispatch] = useContext(UIContext)

  // HTML input state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // CSS :focus state
  const [isEmailFocused, setEmailFocused] = useState(false)
  const [isPasswordFocused, setPasswordFocused] = useState(false)

  /**
   * Registers user and logs them in
   * or gives an error message if registration fails
   */
  const signup = async () => {
    try {
      await api.service('users').create({
        email, password
      })
      api.authenticate({ strategy: 'local', email, password })
    } catch (e) {
      uiDispatch(setMessages([{
        type: 'error',
        content: `A user with the email ${email} already exists!`
      }]))
    }
  }

  /**
   * Returns user to previous page
   */
  const cancel = () => {
    history.goBack()
  }

  // Redirects user to home with success message after log in
  useEffect(() => {
    if (!auth.user) return

    uiDispatch(queueMessages([{
      type: 'success',
      content: `Logged in as ${auth.user.email} !`
    }]))

    history.push('/')
  }, [auth, uiDispatch, history])

  return (
    <Page className='login-page'>
      <header className='page-title'>
        <h2>Sign Up</h2>
        <h3>Create a email and password:</h3>
      </header>
      <div
        className={'form email-form ' + (isEmailFocused ? 'focused' : '')}
      >
        <label htmlFor='email-input'>email:</label>
        <input
          id='email-input'
          value={email}
          onChange={e => setEmail(e.target.value)}
          onFocus={() => { setEmailFocused(true) }}
          onBlur={() => { setEmailFocused(false) }}
        />
      </div>
      <div
        className={'form password-form ' + (isPasswordFocused ? 'focused' : '')}
      >
        <label htmlFor='password-input'>password:</label>
        <input
          id='password-input'
          value={password}
          onChange={e => setPassword(e.target.value)}
          onFocus={() => { setPasswordFocused(true) }}
          onBlur={() => setPasswordFocused(false)}
          type='password'
        />
      </div>
      <div className='controls'>
        <p>Already have an account? <Link to='/login'>Log In</Link></p>
        <button className='btn save-btn' onClick={signup}>Sign Up</button>
        <button
          className='btn cancel-btn'
          onClick={() => { cancel() }}
        > Cancel
        </button>
      </div>
    </Page>
  )
}
