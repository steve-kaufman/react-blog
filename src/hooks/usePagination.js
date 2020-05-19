import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export const usePagination = () => {
  const history = useHistory()

  // Keep track of page number
  const [page, setPage] = useState(null)

  // Set page number when component mounts
  useEffect(() => {
    // Default to page 1
    const { search } = history.location
    const searchParams = new URLSearchParams(search.replace('?', ''))
    const pg = searchParams.get('pg')

    if (!pg) {
      history.push(history.location.pathname + '?pg=1')
      setPage(1)
    } else {
      setPage(Number(pg))
    }
  }, [setPage, history, history.location])

  return [page, setPage]
}
