import React, { useEffect, useContext } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useLocation } from 'react-router-dom'

import './Page.scss'

import { Messages } from './messages/Messages'

import { UIContext } from '../../context'
import { setMenuOpen } from '../../actions'
import { Sidebar } from '..'

export const Page = (props) => {
  // Router location object
  const location = useLocation()

  // UI context
  const [uiState, uiDispatch] = useContext(UIContext)

  // Close menu and go to top of page when location changes (refresh)
  useEffect(() => {
    window.scrollTo(0, 0)
    uiDispatch(setMenuOpen(false))
  }, [uiDispatch, location.pathname])

  // If children are not passed, use blank array
  const children = props.children || []

  // If noTransition is specified, don't add transitions to children
  if (props.noTransition) {
    return (
      <main id='page-main' className={props.className}>
        <Messages messages={uiState.messages} />
        {children}
      </main>
    )
  }

  // Wrap each child in a transition with an incrementing delay
  return (
    <main id='page-main' className={props.className}>
      <Messages messages={uiState.messages} />
      <TransitionGroup appear className='list-page'>
        {React.Children.map(children, (child, i) => {
          const transitionDelay = i * 200
          return (
            <CSSTransition
              key={i}
              timeout={800 + transitionDelay}
              classNames='page-item'
            >
              {React.cloneElement(child, {
                style: { transitionDelay: transitionDelay + 'ms' }
              })}
            </CSSTransition>
          )
        })}
      </TransitionGroup>
      {uiState.isLg ? <Sidebar /> : null}
    </main>
  )
}
