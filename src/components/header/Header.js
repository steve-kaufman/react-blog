import React, { useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import './Header.scss'

import { AuthContext, UIContext } from '../../context'
import { setMenuOpen, logout as logoutAction } from '../../actions'

export const Header = () => {
  const [auth, authDispatch] = useContext(AuthContext)
  const [ui, uiDispatch] = useContext(UIContext)

  const history = useHistory()

  const logout = () => {
    authDispatch(logoutAction())

    history.replace({
      pathname: '/',
      state: {
        messages: ['Logged out!']
      }
    })
  }

  const toggleMenu = () => {
    uiDispatch(setMenuOpen(!ui.menuIsOpen))
  }

  const showClass = ui.menuIsOpen ? "show" : ""

  return (
    <header id="page-header">
      <Link to='/'>
        <span className="header-title">React Blog</span>
      </Link>
      <div className={`menu-btn ${showClass}`} onClick={toggleMenu}>
        <div className="btn-line"></div>
        <div className="btn-line"></div>
        <div className="btn-line"></div>
      </div>
      <nav className={`menu ${showClass}`}>
        <ul className="nav-link-list">
          <li className={`nav-link ${showClass}`}>
            <Link to='/'> Home </Link> 
          </li>
          <li className={`nav-link ${showClass}`}>
            <Link to='/about'> About </Link>
          </li>
        </ul>
        <ul className="nav-link-list">
          {!auth.user ? 
          <>
            <li className={`nav-link ${showClass}`}>
              <Link to='/login'> Log In </Link>
            </li>
            <li className={`nav-link ${showClass}`}>
              <Link to='/signup'> Sign Up </Link>
            </li>
          </> :
            <li className={`nav-link ${showClass}`}>
              <button onClick={logout}> Log Out </button>
            </li> 
          }
        </ul>
      </nav>
    </header>
  )
}
