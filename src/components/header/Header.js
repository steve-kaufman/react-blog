import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

export const Header = () => {
  const [showClass, setShowClass] = useState("")

  const toggleShowClass = () => {
    setShowClass(showClass === "show" ? "" : "show")
  }

  return (
    <header id="page-header">
      <Link to='/'>
        <span className="header-title">React Blog</span>
      </Link>
      <div className={`menu-btn ${showClass}`} onClick={toggleShowClass}>
        <div className="btn-line"></div>
        <div className="btn-line"></div>
        <div className="btn-line"></div>
      </div>
      <nav className={`menu ${showClass}`}>
        <ul className="nav-link-list">
          <li className={`nav-link ${showClass}`}>Home</li>
          <li className={`nav-link ${showClass}`}>About</li>
        </ul>
        <ul className="nav-link-list">
          <li className={`nav-link ${showClass}`}>Log In</li>
          <li className={`nav-link ${showClass}`}>Sign Up</li>
        </ul>
      </nav>
    </header>
  )
}
