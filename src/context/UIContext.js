import React, { useReducer, createContext } from 'react'

const initialState = {
  menuIsOpen: true
}

export const UIContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'setMenuOpen':
      return { ...state, menuIsOpen: action.payload }
    default:
      throw new Error(`Action ${action.type} does not exist for UIContext reducer`)
  }
}

export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UIContext.Provider value={[state, dispatch]}>
      {children}
    </UIContext.Provider>
  )
}