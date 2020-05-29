import React, { useReducer, createContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { clearMessages, loadMessages } from '../actions'
import breakpoints from '../sass/breakpoints.scss'

const md = Number(breakpoints.md)
const lg = Number(breakpoints.lg)

const initialState = {
  menuIsOpen: false,
  messages: [],
  queuedMessages: [],
  isMd: (window.innerWidth > md) && !(window.innerWidth > lg),
  isLg: window.innerWidth > lg
}

export const UIContext = createContext()

const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'setMenuOpen':
      return { ...state, menuIsOpen: payload }
    case 'clearMessages':
      return { ...state, messages: [] }
    case 'deleteMessage':
      return {
        ...state,
        messages: state.messages.filter((message, i) => payload !== i)
      }
    case 'setMessages':
      return {
        ...state,
        messages: payload
      }
    case 'addMessage':
      return {
        ...state,
        messages: [...state.messages, payload]
      }
    case 'queueMessages':
      return {
        ...state,
        queuedMessages: [...state.queuedMessages, ...payload]
      }
    case 'loadMessages':
      return {
        ...state,
        messages: state.queuedMessages,
        queuedMessages: []
      }
    case 'windowResize':
      // payload is window innerWidth
      return {
        ...state,
        isLg: (payload > lg),
        isMd: (payload > md) && !(payload > lg)
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

  useEffect(() => {
    window.addEventListener('resize', () => {
      dispatch({
        type: 'windowResize',
        payload: window.innerWidth
      })
    })
  }, [])

  return (
    <UIContext.Provider value={[state, dispatch]}>
      {children}
    </UIContext.Provider>
  )
}
