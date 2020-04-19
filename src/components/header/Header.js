import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

import { UIContext } from '../../context'
import { setMenuOpen } from '../../actions'

export const Header = () => {
  const [ui, dispatch] = useContext(UIContext)

  const toggleMenu = () => {
    dispatch(setMenuOpen(!ui.menuIsOpen))
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
          <li className={`nav-link ${showClass}`}>
            <Link to='/login'> Log In </Link>
          </li>
          <li className={`nav-link ${showClass}`}>
            <Link to='/register'> Sign Up </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
