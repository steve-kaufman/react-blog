import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import './Post.scss'

import thumbsOUp from '@iconify/icons-fa/thumbs-o-up'
import thumbsUp from '@iconify/icons-fa/thumbs-up'
import thumbsODown from '@iconify/icons-fa/thumbs-o-down'
import thumbsDown from '@iconify/icons-fa/thumbs-down'

import pencilIcon from '@iconify/icons-fa/pencil'

import { AuthContext } from '../../context'
// import api from '../../api'

export const Post = (props) => {
  const { id, title, content, author, style, short } = props

  const [auth] = useContext(AuthContext)

  const [isThumbUp, setThumbUp] = useState(false)
  const [isThumbDown, setThumbDown] = useState(false)


  const isAuthor = auth.user?.id === author.id

  const toggleThumbUp = () => {
    setThumbUp(!isThumbUp)
  }
  const toggleThumbDown = () => {
    setThumbDown(!isThumbDown)
  }

  const editLink = (
    <Link to={`/post/edit/${id}`}>
      <Icon 
        icon={pencilIcon} 
        width="1.2rem" height="1.2rem" />
    </Link>
  )

  return (
    <article className="post" style={style}>
      <header className="post-header">
        {isAuthor ? editLink : null}
        <span className="author-link link">{ author.email }</span>
      </header>
      <aside className="post-controls">
        <span className="btn" onClick={toggleThumbUp}>
          <Icon 
            icon={isThumbUp ? thumbsUp : thumbsOUp} 
            width="1.5rem" height="1.5rem" />
        </span>
        <span className="btn" onClick={toggleThumbDown}>
          <Icon 
            icon={isThumbDown ? thumbsDown : thumbsODown} 
            width="1.5rem" height="1.5rem" />
        </span>
      </aside>
      <div className={'post-content' + (short ? ' short' : '')}>
        <Link to={`/post/${id}`}>
          <h3 className="post-title link">{ title }</h3>
        </Link>
        <p>{ content }</p>
      </div>
    </article>
  )
}

Post.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired
}