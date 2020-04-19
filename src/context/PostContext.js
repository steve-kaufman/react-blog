import React, { useReducer, createContext } from 'react'
import { updateReducer, createReducer } from '../reducers/post'

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

const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'create':
      return createReducer(state, payload)
    case 'update':
      return updateReducer(state, payload)
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