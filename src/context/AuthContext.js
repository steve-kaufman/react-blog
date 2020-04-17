import React, { useContext, useReducer } from 'react'

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

export const AuthContext = useContext()

// anonymous user
const initialState = {
  loggedIn: false,
  user: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      const { username, password } = action.payload
      const user = users.find(user => user.username === username)
      if (!user) return initialState
      if (password !== user.password) return initialState
      return { loggedIn: true, user }
    case 'logout':
      return initialState
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