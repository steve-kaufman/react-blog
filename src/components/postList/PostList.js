import React, { useContext } from 'react'
import moment from 'moment'
import './PostList.scss';

import { Post } from '..'
import { ListPage } from '..'

import { PostContext } from '../../context/PostContext'

export const PostList = () => {
  const [posts] = useContext(PostContext)

  const currentTime = moment().format('MMMM Do YYYY, h:mm a')

  return (
    <ListPage>
      <header className="page-title">
        <h2 className="">Recent Posts:</h2>
        <h4 className="text-secondary-light">{currentTime}</h4>
      </header>
      {posts.map((post, i) => {
        const { id, title, content, author } = post
        return (
          <Post 
            key={i}
            id={id} 
            title={title} 
            content={content} 
            author={author} 
            short={true}
          />
        )
      })}
    </ListPage>
  )
}