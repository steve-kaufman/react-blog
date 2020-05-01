import React, { useState, useContext, useEffect } from 'react'
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
import api from '../../api'
// import api from '../../api'

export const Post = (props) => {
  // destructure props
  const { post, isShort } = props
  // destructure post information
  const { id, title, content, user, style } = post

  const [auth] = useContext(AuthContext)

  const [userLiked, setUserLiked] = useState(null)

  const [isThumbUp, setThumbUp] = useState(false)
  const [isThumbDown, setThumbDown] = useState(false)

  const isAuthor = auth.user?.id === user.id

  useEffect(() => {
    setUserLiked(props.post.userLiked)
    console.log(props.post.userLiked)
  }, [props.post.userLiked])
  
  // When the userLiked object is updated, update the icons
  useEffect(() => {
    setThumbUp(userLiked?.like)
    setThumbDown(userLiked?.like === 0)
  }, [userLiked])

  const toggleThumbUp = () => {
    // if not logged in, do nothing
    if (!auth.user) return

    // if the user already liked, remove the like object
    // else create a like object
    if (userLiked?.like) {
      api.service('likes').remove(userLiked.id)
        .then(() => {
          setUserLiked(null)
        })
    } else {
      api.service('likes').create({
        like: true,
        postId: id
      }).then(res => {
        setUserLiked({
          id: res.id,
          like: res.like
        })
      })
    }
  }
  const toggleThumbDown = () => {
    // if not logged in, do nothing
    if (!auth.user) return

    // if user already disliked, remove the like object
    // else create a like object
    if (userLiked?.like === 0) {
      api.service('likes').remove(userLiked.id)
        .then(() => {
          setUserLiked(null)
        })
    } else {
      api.service('likes').create({
        like: false,
        postId: id
      }).then(res => {
        setUserLiked({
          id: res.id,
          like: res.like
        })
      })
    }
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
        <span className="author-link link">{ user.email }</span>
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
      <div className={'post-content' + (isShort ? ' short' : '')}>
        <Link to={`/post/${id}`}>
          <h3 className="post-title link">{ title }</h3>
        </Link>
        <p>{ content }</p>
      </div>
    </article>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired
}