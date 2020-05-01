import React, { useState, useContext, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './Signup.scss'

import { Page } from '../..'

import { AuthContext } from '../../../context'
// import { signup as signupAction } from '../../../actions'
import api from '../../../api'

export const Signup = () => {
  // User authentication context
  const [auth] = useContext(AuthContext)

  // HTML input state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // State for CSS :focus styling
  const [isEmailFocused, setEmailFocused] = useState(false)
  const [isPasswordFocused, setPasswordFocused] = useState(false)

  // UI state
  const [cancelled, setCancelled] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  // const [messages, setMessages] = useState([])

  const signup = () => {
    // dispatch(signupAction(email, password))
    api.service('users').create({
      email, password
    }).then(user => {
      api.authenticate({ strategy: 'local', email, password })
    }).catch(() => {
      setError([`A user with the email ${email} already exists!`])
    })
  }

  useEffect(() => {
    if (!auth.user) return

    setSuccess([{
      type: 'success',
      content: `Logged in as ${auth.user.email} !`
    }])
  }, [auth])

  if (success) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: {
            messages: success
          }
        }}
      />
    )
  }

  if (cancelled) {
    return <Redirect to='/' />
  }

  return (
    <Page className='login-page' messages={error}>
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
          onClick={() => { setCancelled(true) }}
        > Cancel
        </button>
      </div>
    </Page>
  )
}
