import React, { useReducer, createContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { clearMessages, loadMessages } from '../actions'

const initialState = {
  menuIsOpen: false,
  messages: [],
  queuedMessages: []
}

export const UIContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'setMenuOpen':
      return { ...state, menuIsOpen: action.payload }
    case 'clearMessages':
      return { ...state, messages: [] }
    case 'deleteMessage':
      return { 
        ...state, 
        messages: state.messages.filter((message, i) => action.payload !== i)
      }
    case 'setMessages':
      return {
        ...state,
        messages: action.payload
      }
    case 'addMessage':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      }
    case 'queueMessages':
      return {
        ...state,
        queuedMessages: [...state.queuedMessages, ...action.payload]
      }
    case 'loadMessages':
      return {
        ...state,
        messages: state.queuedMessages,
        queuedMessages: []
      }
    default:
      throw new Error(`Action ${action.type} does not exist`)
  }
}

export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const history = useHistory()

  useEffect(() => {
    dispatch(clearMessages())
    dispatch(loadMessages())
  }, [history.location])

  return (
    <UIContext.Provider value={[state, dispatch]}>
      {children}
    </UIContext.Provider>
  )
}