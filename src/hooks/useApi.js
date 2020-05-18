import { useState, useEffect, useContext } from 'react'
import api from '../api'

import { UIContext } from '../context'
import { setMessages } from '../actions'

export const useApi = (method, service, ...options) => {
  // UI context dispatch
  const [, uiDispatch] = useContext(UIContext)

  // Result
  const [obj, setObj] = useState(null)
  // Error state
  const [error, setError] = useState(false)

  // Fetches object when component mounts
  useEffect(() => {
    if (obj || error) return

    const getObj = async () => {
      try {
        const res = await api.service(service)[method](...options)
        setObj(method === 'find' ? res.data : res)
      } catch (e) {
        setError(true)
        uiDispatch(setMessages([{
          type: 'error',
          content: e.message
        }]))
      }
    }

    getObj()
  }, [method, service, options, obj, error, uiDispatch])

  return [obj, error]
}
