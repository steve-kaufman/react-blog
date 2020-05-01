import React, { useState, useEffect } from 'react'
import api from '../../../api'
import moment from 'moment'
import './PostList.scss';

import { Post } from '../..'
import { Page } from '../..'

// import { PostContext } from '../../../context'

export const PostList = () => {
  // const [posts, dispatch] = useContext(PostContext)

  const [posts, setPosts] = useState([])

  useEffect(() => {
    api.service('posts').find().then(res => {
      setPosts(res.data)
    })
  }, [posts])

  const currentTime = moment().format('MMMM Do YYYY, h:mm a')

  return (
    <Page>
      <header className="page-title">
        <h2 className="">Recent Posts:</h2>
        <h4 className="text-secondary-light">{currentTime}</h4>
      </header>
      {posts.map((post, i) => {
        const { id, title, content, user } = post
        return (
          <Post 
            key={i}
            id={id} 
            title={title} 
            content={content} 
            author={user} 
            short={true}
          />
        )
      })}
    </Page>
  )
}