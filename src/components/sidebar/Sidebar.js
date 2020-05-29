import React, { useContext } from 'react'
import './Sidebar.scss'
import { Link, useRouteMatch } from 'react-router-dom'
import { AuthContext } from '../../context'

const anonymousMsg = (
  <>
    <h2>Welcome to react blog!</h2>
    <br />
    <p>
      <Link to='/login'>Log in</Link> to create a post or&nbsp;
      <Link to='/signup'>sign up</Link> if you don't have an account
    </p>
  </>
)

export const Sidebar = () => {
  const [auth] = useContext(AuthContext)

  const msg = auth.user ? (
    <>
      <h3>Welcome, {auth.user.email}!</h3>
      <p>
        Create a <Link to='/create'>new post</Link> or view&nbsp;
        <Link to={`/u/${auth.user.email}`}>your profile</Link>
      </p>
    </>
  ) : anonymousMsg

  return (
    <aside className='sidebar'>
      {msg}
    </aside>
  )
}
