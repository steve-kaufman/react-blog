import React, { useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import './Header.scss'

import { AuthContext, UIContext } from '../../context'
import { setMenuOpen, queueMessages, setMessages } from '../../actions'
import api from '../../api'

export const Header = () => {
  // Router history object
  const history = useHistory()

  // Auth context state
  const [auth] = useContext(AuthContext)
  // UI context
  const [ui, uiDispatch] = useContext(UIContext)

  /**
   * Logs out user, redirects to home page with sucess message
   */
  const logout = async () => {
    await api.logout()

    uiDispatch(setMenuOpen(false))

    const messages = [{
      type: 'success',
      content: 'Logged out!'
    }]

    // If already on home page redirect won't work
    if (history.location.pathname === '/') {
      uiDispatch(setMessages(messages))
    }
    else {
      uiDispatch(queueMessages(messages))
      history.push({ pathname: '/' })
    }
  }

  /**
   * Toggles whether menu is collapsed or open
   */
  const toggleMenu = () => {
    uiDispatch(setMenuOpen(!ui.menuIsOpen))
  }

  // Class to add to menu items when menu is open
  const showClass = ui.menuIsOpen ? 'show' : ''

  return (
    <header id='page-header'>
      <Link to='/'>
        <span className='header-title'>React Blog</span>
      </Link>
      <div className={`menu-btn ${showClass}`} onClick={toggleMenu}>
        <div className='btn-line' />
        <div className='btn-line' />
        <div className='btn-line' />
      </div>
      <nav className={`menu ${showClass}`}>
        <ul className='nav-link-list'>
          <li className={`nav-link ${showClass}`}>
            <Link to='/'> Home </Link>
          </li>
          <li className={`nav-link ${showClass}`}>
            <Link to='/about'> About </Link>
          </li>
        </ul>
        <ul className='nav-link-list'>
          {!auth.user
            ? (
              <>
                <li className={`nav-link ${showClass}`}>
                  <Link to='/login'> Log In </Link>
                </li>
                <li className={`nav-link ${showClass}`}>
                  <Link to='/signup'> Sign Up </Link>
                </li>
              </>
            )
            : (
              <>
                <li className={`nav-link ${showClass}`}>
                  <Link to='/create'> New Post </Link>
                </li>
                <li className={`nav-link ${showClass}`}>
                  <button onClick={logout}> Log Out </button>
                </li>
              </>
            )}
        </ul>
      </nav>
    </header>
  )
}
