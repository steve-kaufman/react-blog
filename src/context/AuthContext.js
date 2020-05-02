import React, { createContext, useState, useEffect } from 'react'

import api from '../api'

/** Context */

export const AuthContext = createContext()

const initialState = { }

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState)

  useEffect(() => {
    api.reAuthenticate().catch(() => {
      setAuth(initialState)
    })

    api.on('authenticated', login => {
      setAuth(login)
    })

    api.on('logout', () => {
      setAuth(initialState)
    })
  }, [])

  return (
    <AuthContext.Provider value={[auth]}>
      {children}
    </AuthContext.Provider>
  )
}
