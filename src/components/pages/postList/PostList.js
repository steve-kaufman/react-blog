import React, { useState, useEffect, useContext } from 'react'
import api from '../../../api'
import moment from 'moment'
import './PostList.scss'

import { Post, Page } from '../..'
import { useLocation } from 'react-router-dom'

import { AuthContext } from '../../../context'

export const PostList = () => {
  // const [posts, dispatch] = useContext(PostContext)
  const [auth] = useContext(AuthContext)

  const location = useLocation()

  const [posts, setPosts] = useState([])

  useEffect(() => {
    api.service('posts').find().then(res => {
      console.log(res)
      setPosts(res.data)
    })

    console.log('fetching posts')
  }, [location.state, auth])

  const currentTime = moment().format('MMMM Do YYYY, h:mm a')

  return (
    <Page>
      <header className='page-title'>
        <h2 className=''>Recent Posts:</h2>
        <h4 className='text-secondary-light'>{currentTime}</h4>
      </header>
      {posts.map((post, i) => {
        // const { id, title, content, user } = post
        return (
          <Post
            post={post}
            isShort
            key={i}
            // id={id}
            // title={title}
            // content={content}
            // author={user}
          />
        )
      })}
    </Page>
  )
}
