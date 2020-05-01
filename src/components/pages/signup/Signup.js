import React, { useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './Signup.scss'

import { Page } from '../..'

import { AuthContext } from '../../../context'
import { signup as signupAction } from '../../../actions'

export const Signup = () => {
  const [email, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [emailFocused, setUsernameFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const [auth, dispatch] = useContext(AuthContext)
  const [cancelled, setCancelled] = useState(false)

  const [messages, setMessages] = useState([])

  const signup = () => {
    dispatch(signupAction(email, password))

    if (!auth.user) {
      setMessages([`A user with the email ${email} already exists!`])
    }
  }

  if (auth.user) {
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
        <h2>Sign Up</h2>
        <h3>Create a email and password:</h3>
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
        <p>Already have an account? <Link to='/login'>Log In</Link></p>
        <button className="btn save-btn" onClick={signup}>Sign Up</button>
        <button 
          className="btn cancel-btn" 
          onClick={() => { setCancelled(true) }}
        > Cancel </button>
      </div>
    </Page>
  )
}
