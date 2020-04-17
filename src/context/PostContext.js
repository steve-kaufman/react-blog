import React, { useReducer, createContext } from 'react'

export const PostContext = createContext()

const intialState = [
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
]

const reducer = (posts, action) => {
  switch (action.type) {
    case 'update':
      const { id, title, content } = action.payload

      return posts.map(post => {
        if (post.id === id) {
          return { ...post, title, content }
        }
        return post
      });
    default:
      throw new Error()
  }
}

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState)

  return (
    <PostContext.Provider value={[state, dispatch]}>
      {children}
    </PostContext.Provider>
  )
}