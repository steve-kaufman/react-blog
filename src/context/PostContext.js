import React, { useState, createContext } from 'react'

export const PostContext = createContext()

export const PostProvider = ({ children }) => {
  const [posts] = useState([
    {
      id: 1,
      title: 'How to make the perfect omelete',
      content: 'Step 1\nBreak the egg in to seven pieces, very yummy\nStep 2\nBeat it with a stick',
      author: {
        id: 1,
        username: "steveplaysguiola"
      }
    },
    {
      id: 2,
      title: 'Post 2',
      content: 'This is the second post',
      author: {
        id: 2,
        username: "joe_doe123"
      }
    },
    {
      id: 3,
      title: 'Post 3',
      content: 'This is the third post',
      author: {
        id: 1,
        username: "steveplaysguiola"
      }
    }
  ])

  return (<PostContext.Provider value={[posts]}>
    {children}
  </PostContext.Provider>)
}