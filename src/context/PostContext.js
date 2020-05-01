import React, { createContext, useReducer } from 'react'
import api from '../api'
// import { updateReducer, createReducer } from '../reducers/post'

const service = api.service('posts')

export const PostContext = createContext()

const intialState = [ ]

const reducer = async (state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'find':
      const res = await service.find()
      return res.data
    case 'create':
      service.create(payload)
      return state
    case 'update':
      service.patch(action.id, payload)
      return state
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