import React from 'react'
import './NotFound.scss'

import { Page } from '../..'

export const NotFound = () => {
  return (
    <Page className='page-not-found' noTransition={true}>
      <h1>Page Not Found!</h1>
      <h4>Looks like we don't have anything at that URL</h4>
    </Page>
  )
}