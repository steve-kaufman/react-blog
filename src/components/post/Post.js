import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import thumbsOUp from '@iconify/icons-fa/thumbs-o-up'
import thumbsUp from '@iconify/icons-fa/thumbs-up'
import thumbsODown from '@iconify/icons-fa/thumbs-o-down'
import thumbsDown from '@iconify/icons-fa/thumbs-down'

import './Post.scss'

export const Post = (props) => {
  const { id, title, content, author, style, short } = props

  const [isThumbUp, setThumbUp] = useState(false)
  const [isThumbDown, setThumbDown] = useState(false)

  const toggleThumbUp = () => {
    setThumbUp(!isThumbUp)
  }
  const toggleThumbDown = () => {
    setThumbDown(!isThumbDown)
  }

  return (
    <article className="post" style={style}>
      <header className="post-header">
        <span className="author-link link">{ author.username }</span>
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