import React, { useState } from 'react'
import './PostList.scss';

import { Post } from '..'

export const PostList = () => {
  const [posts] = useState([
    {
      title: 'How to make the perfect omelete',
      content: 'Step 1\nBreak the egg in to seven pieces, very yummy\nStep 2\nBeat it with a stick',
      authorId: 1
    },
    {
      title: 'Post 2',
      content: 'This is the second post',
      authorId: 2
    },
    {
      title: 'Post 3',
      content: 'This is the third post',
      authorId: 1
    }
  ])

  return (
    <main id="PostList">
      <h2 className="page-title">Posts:</h2>
      <ul className="postList">
        {posts.map(({ title, content, authorId }, i) => (
          <Post title={title} content={content} authorId={authorId} key={i} />
        ))}
      </ul>
    </main>
  )
}