import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Login.scss'

import { Page } from '../..'

import { UIContext } from '../../../context'
// import { login as loginAction } from '../../../actions'

import api from '../../../api'
import { setMessages, queueMessages } from '../../../actions'

export const Login = () => {
  const history = useHistory()

  const [, uiDispatch] = useContext(UIContext)

  const [email, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [emailFocused, setUsernameFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

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

  const cancel = () => {
    history.push('/')
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
