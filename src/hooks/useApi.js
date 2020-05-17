import { useState, useEffect } from 'react'
import api from '../api'

export const useApi = (method, service, ...options) => {
  // Result
  const [obj, setObj] = useState(null)
  // Errors 
  const [error, setError] = useState(null)

  // Fetches object when component mounts
  useEffect(() => {
    if (obj || error) return

    const getObj = async () => {
      try {
        const res = await api.service(service)[method](...options)
        setObj(method === 'find' ? res.data : res)
      } catch (e) {
        setError({
          type: 'info',
          content: e.message
        })
      }
    }

    getObj()
  }, [method, service, options, obj, error])

  return [obj, error]
}
