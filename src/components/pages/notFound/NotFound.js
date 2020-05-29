import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Icon } from '@iconify/react'
import arrowLeft from '@iconify/icons-fa/arrow-left'
import './NotFound.scss'

import { Page } from '../..'
import { UIContext } from '../../../context'

export const NotFound = () => {
  const history = useHistory()

  const [ui] = useContext(UIContext)

  const goBack = () => {
    history.goBack()
  }

  // Only render back button on mobile device
  const backButton = ui.isLg ? null : (
    <button className='backbutton' onClick={goBack}>
      <Icon icon={arrowLeft} />
    </button>
  )

  return (
    <Page className='page-not-found' noTransition>
      {backButton}
      <div className='billboard'>
        <h1>Page Not Found!</h1>
        <h4>Looks like we don't have anything at that URL</h4>
      </div>
    </Page>
  )
}
