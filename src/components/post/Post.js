import React from 'react'
import PropTypes from 'prop-types'
import './Post.scss'

export const Post = (post) => {
  const { title, content, authorId } = post

  return (
    <article className="post">
      <header className="post-header">
        <h3 className="post-title link">{ title }</h3>
        <span className="author-link link">{ authorId }</span>
      </header>
      <p className="post-content">{ content }</p>
    </article>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  authorId: PropTypes.number.isRequired
}