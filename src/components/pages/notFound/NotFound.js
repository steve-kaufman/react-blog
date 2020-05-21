import React from 'react'
import { useHistory } from 'react-router-dom'
import { Icon } from '@iconify/react'
import arrowLeft from '@iconify/icons-fa/arrow-left'
import './NotFound.scss'

import { Page } from '../..'

export const NotFound = () => {
  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  return (
    <Page className='page-not-found' noTransition>
      <button className='backbutton' onClick={goBack}>
        <Icon icon={arrowLeft} />
      </button>
      <div className='billboard'>
        <h1>Page Not Found!</h1>
        <h4>Looks like we don't have anything at that URL</h4>
      </div>
    </Page>
  )
}
