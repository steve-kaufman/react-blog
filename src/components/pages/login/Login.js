import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Login.scss'

import api from '../../../api'

import { Page } from '../..'

import { UIContext } from '../../../context'
import { setMessages, queueMessages } from '../../../actions'

export const Login = () => {
  // Router history object
  const history = useHistory()

  // UI context dispatch
  const [, uiDispatch] = useContext(UIContext)

  // HTML input state
  const [email, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // CSS :focus state
  const [emailFocused, setUsernameFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  /**
   * Authenticate user and redirect to home with success message
   * or display error message if authentication fails
   */
  const login = async () => {
    // dispatch(loginAction(email, password))
    try {
      const auth = await api.authenticate({
        strategy: 'local',
        email,
        password
      })
      uiDispatch(queueMessages([{
        type: 'success',
        content: `Logged in as ${auth.user.email} !`
      }]))
      history.push('/')
    } catch (e) {
      uiDispatch(setMessages([{
        type: 'info',
        content: 'Incorrect email and/or password!'
      }]))
    }
  }

  /**
   * Return user to previous page
   */
  const cancel = () => {
    history.goBack()
  }

  return (
    <Page className='login-page'>
      <header className='page-title'>
        <h2>Log In</h2>
        <h3>Enter your email and password:</h3>
      </header>
      <div className={'form email-form ' + (emailFocused ? 'focused' : '')}>
        <label htmlFor='email-input'>email:</label>
        <input 
          id='email-input' 
          value={email}
          onChange={e => setUsername(e.target.value)}
          onFocus={() => { setUsernameFocused(true) }}
          onBlur={() => setUsernameFocused(false)}
        />
      </div>
      <div className={'form password-form ' + (passwordFocused ? 'focused' : '')}>
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
      <div className="controls">
        <p>Need an account? <Link to='/sign-up'>Sign Up</Link></p>
        <button className="btn save-btn" onClick={login}>Log In</button>
        <button 
          className="btn cancel-btn" 
          onClick={() => { cancel() }}
        > Cancel </button>
      </div>
    </Page>
  )
}
