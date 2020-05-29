import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import './PostList.scss'

import { LoadingPage, Post, Page, Pagination } from '../..'

import { useApi } from '../../../hooks/useApi'
import { usePagination } from '../../../hooks/usePagination'

export const PostList = () => {
  // Get user email from params
  const params = useParams()

  // Get page data from pagination hook
  const [page, setPage] = usePagination()

  // Hold user email and posts array
  const [email, setEmail] = useState(params.email)

  // Get posts and potential errors from API
  const [result, error, reload] = useApi('find', 'posts', {
    query: {
      $limit: 10,
      $sort: {
        updatedAt: -1
      },
      $skip: (page - 1) * 10,
      email
    }
  })

  /**
   * Set email if provided
   */
  useEffect(() => {
    if (params.email !== email) {
      setEmail(params.email)
      reload()
    }
  }, [params.email, setEmail, email, reload])

  /**
   * Get new posts when page changes
   */
  useEffect(() => {
    reload()
  }, [page, reload])

  // If there's an error return blank page
  if (error) {
    return <Page />
  }

  // If posts aren't loaded return loading page
  if (!result) {
    return <LoadingPage />
  }

  /* Posts are loaded! */

  // Get posts from result
  const posts = result.data

  // Get current date and time
  const currentTime = moment().format('MMMM Do YYYY, h:mm a')

  return (
    <Page>
      <header className='page-title'>
        <h2>{email ? `Posts by ${email}` : 'Recent Posts:'}</h2>
        <h4 className='text-secondary-light'>{currentTime}</h4>
      </header>
      {posts.map((post, i) => (
        <Post post={post} isShort key={i} />
      ))}
      <Pagination
        totalItems={result.total}
        itemsPerPage={result.limit}
        currentPage={page}
        setPage={setPage}
      />
    </Page>
  )
}
