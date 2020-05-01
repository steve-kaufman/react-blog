import React, { useState, useContext, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './Login.scss'

import { Page } from '../..'

import { AuthContext } from '../../../context'
// import { login as loginAction } from '../../../actions'

import api from '../../../api'

export const Login = () => {
  const [email, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [emailFocused, setUsernameFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const [auth] = useContext(AuthContext)
  const [success, setSuccess] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (auth.user) {
      setSuccess(true)
    }
  }, [auth])

  const login = () => {
    // dispatch(loginAction(email, password))
    api.authenticate({
      strategy: 'local',
      email,
      password
    }).catch(() => {
      setMessages([{
        type: 'info',
        content: 'Incorrect email and/or password!'
      }])
    })
  }

  if (success) {
    return <Redirect to={{
      pathname: '/',
      state: {
        messages: [{
          type: 'success',
          content: `Logged in as ${auth.user.email} !`
        }]
      }
    }} />
  }

  if (cancelled) {
    return <Redirect to='/' />
  }

  return (
    <Page className='login-page' messages={messages}>
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
          onClick={() => { setCancelled(true) }}
        > Cancel </button>
      </div>
    </Page>
  )
}
