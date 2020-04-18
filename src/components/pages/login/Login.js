import React, { useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './Login.scss'

import { Page } from '../..'

import { AuthContext } from '../../../context/AuthContext'
import { login as loginAction } from '../../../actions'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [usernameFocused, setUsernameFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const [auth, dispatch] = useContext(AuthContext)
  const [cancelled, setCancelled] = useState(false)

  const [messages, setMessages] = useState([])

  const login = () => {
    dispatch(loginAction(username, password))

    if (!auth.user) {
      setMessages(['Incorrect username and/or password!'])
    }
  }

  if (auth.user) {
    return <Redirect to={{
      pathname: '/',
      state: {
        messages: [`Logged in as ${auth.user.username} !`]
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
        <h3>Enter your username and password:</h3>
      </header>
      <div className={'form username-form ' + (usernameFocused ? 'focused' : '')}>
        <label htmlFor='username-input'>username:</label>
        <input 
          id='username-input' 
          value={username}
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
