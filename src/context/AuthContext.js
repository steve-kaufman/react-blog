import React, { createContext, useReducer } from 'react'

import { loginReducer, signupReducer } from '../reducers/auth'

// dummy users
const users = [
  {
    id: 1,
    username: 'steveplaysguiola',
    password: '1234'
  },
  {
    id: 2,
    username: 'joe_doe123',
    password: '4321'
  }
]

/** Context */

export const AuthContext = createContext()

// anonymous user
const initialState = {
  loggedIn: false,
  user: null,
  error: null
}

const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'login':
      return loginReducer(state, payload, users) || initialState
    case 'logout':
      return initialState
    case 'signup':
      return signupReducer(state, payload, users) || initialState
    default:
      throw new Error(`Action ${action} does not exist on AuthContext reducer`)
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  )
}