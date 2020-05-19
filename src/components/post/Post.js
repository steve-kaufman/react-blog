import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import moment from 'moment'
import './Post.scss'

import thumbsOUp from '@iconify/icons-fa/thumbs-o-up'
import thumbsUp from '@iconify/icons-fa/thumbs-up'
import thumbsODown from '@iconify/icons-fa/thumbs-o-down'
import thumbsDown from '@iconify/icons-fa/thumbs-down'

import pencilIcon from '@iconify/icons-fa/pencil'

import { AuthContext } from '../../context'

import { usePost } from '../../hooks/usePost'

export const Post = (props) => {
  // destructure props
  const { post, isShort, style } = props
  // destructure post information
  const { id, title, content, user } = post

  // User authentication context
  const [auth] = useContext(AuthContext)

  // Create like state
  const { thumbs, toggleThumb, likes, dislikes } = usePost(post, auth)

  // Determine if logged in user is the author
  const isAuthor = (auth.user) // Is user logged in?
    ? (auth.user.id === user.id) // Does user match post author?
    : false

  // If logged in user is author, add an edit-post link
  const editLink = isAuthor ? (
    <Link to={`/post/edit/${id}`}>
      <Icon
        icon={pencilIcon}
        width='1.2rem' height='1.2rem'
      />
    </Link>
  ) : null

  // Fix weird space before UTC offset
  post.createdAt = post.createdAt.replace(' +', '+')
  const createdAt = moment.utc(post.createdAt)

  return (
    <article className='post' style={style}>
      <header className='post-header'>
        {editLink}
        <p>{createdAt.calendar()}</p>
        <span className='author-link link'>
          <Link to={`/u/${user.email}`}>{user.email}</Link>
        </span>
      </header>
      <aside className='post-controls'>
        <span className='btn' onClick={() => { toggleThumb('up') }}>
          <Icon
            icon={thumbs.up ? thumbsUp : thumbsOUp}
            width='1.2rem' height='1.2rem'
          />
          <p>{likes}</p>
        </span>
        <span className='btn' onClick={() => { toggleThumb('down') }}>
          <Icon
            icon={thumbs.down ? thumbsDown : thumbsODown}
            width='1.2rem' height='1.2rem'
          />
          <p>{dislikes}</p>
        </span>
      </aside>
      <main className={'post-content' + (isShort ? ' short' : '')}>
        <Link to={`/post/${id}`}>
          <h3 className='post-title link'>{title}</h3>
        </Link>
        <p>{content}</p>
      </main>
    </article>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  isShort: PropTypes.bool,
  style: PropTypes.object
}
