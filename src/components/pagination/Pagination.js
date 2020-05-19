import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'
import './Pagination.scss'

import arrowLeft from '@iconify/icons-fa/arrow-left'
import arrowRight from '@iconify/icons-fa/arrow-right'
import angleDoubleLeft from '@iconify/icons-fa/angle-double-left'
import angleDoubleRight from '@iconify/icons-fa/angle-double-right'
import { useHistory } from 'react-router-dom'

export const Pagination = (props) => {
  const { itemsPerPage, totalItems, currentPage } = props

  const history = useHistory()

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // const pageNumbers = []

  // for (let i = 1; i <= totalPages; i++) {
  //   if (i > currentPage - 3 && i < currentPage + 3) {
  //     pageNumbers.push(i)
  //   }
  // }

  const setPage = (page) => {
    if (page < 1) return
    if (page > totalPages) return
    history.push(history.location.pathname + `?pg=${page}`)
  }

  const [leftButtonClass, setLeftButtonClass] = useState('')
  const [rightButtonClass, setRightButtonClass] = useState('')

  useEffect(() => {
    if (currentPage === 1) {
      setLeftButtonClass('page-link disabled')
    } else {
      setLeftButtonClass('page-link')
    }
  }, [setLeftButtonClass, currentPage])

  useEffect(() => {
    if (currentPage === totalPages) {
      setRightButtonClass('page-link disabled')
    } else {
      setRightButtonClass('page-link')
    }
  }, [setRightButtonClass, currentPage, totalPages])

  return (
    <footer className='page-footer'>
      <div className='pagination'>
        <button className='page-link' onClick={() => setPage(1)}>
          <Icon icon={angleDoubleLeft} />
        </button>
        <button
          className={leftButtonClass}
          onClick={() => setPage(currentPage - 1)}
        >
          <Icon icon={arrowLeft} />
        </button>
        {/* TODO for desktop add numbers to pagination */}
        {/* <span className='divider'>|</span> */}
        {/* <ul className='page-numbers'> */}
        {/* {pageNumbers.map(number => (
          <li key={number}>
            <button
              className={'page-link' + (number === currentPage ? ' active' : '')}
              onClick={() => { setPage(number) }}
            >
              {number}
            </button>
          </li>
        ))} */}
        {/* </ul> */}
        {/* <span className='divider'>|</span> */}
        <button
          className={rightButtonClass}
          onClick={() => setPage(currentPage + 1)}
        >
          <Icon icon={arrowRight} />
        </button>
        <button className='page-link' onClick={() => setPage(totalPages)}>
          <Icon icon={angleDoubleRight} />
        </button>
      </div>
      <h4>pg. {currentPage} - {totalPages}</h4>
    </footer>
  )
}

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
}
