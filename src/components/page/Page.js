import React, { useEffect, useContext, useState } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useLocation } from 'react-router-dom'

import './Page.scss'

import { Messages } from './messages/Messages'

import { /*AuthContext,*/ UIContext } from '../../context'
import { setMenuOpen } from '../../actions'

export const Page = (props) => {
  const location = useLocation()

  // const [auth] = useContext(AuthContext)
  const [ui, dispatch] = useContext(UIContext)

  const refresh = () => {
    window.scrollTo(0, 0)
    if (ui.menuIsOpen) {
      dispatch(setMenuOpen(false))
    }
  }

  useEffect(refresh , [location.pathname, location.state, props.messages])

  const children = props.children || []

  if (props.noTransition) {
    return (
      <main id='page-main' className={props.className}>
        {children}
      </main>
    )
  }

  return (
    <main id='page-main' className={props.className}>
      <Messages messages={ props.messages || [] } />
      <Messages messages={ location.state?.messages || [] } />
      <TransitionGroup appear={true} className='list-page'>
        {React.Children.map(children, (child, i) => { 
          const transitionDelay = i * 200
          return <CSSTransition key={i} timeout={800 + transitionDelay} classNames='page-item'>
            { React.cloneElement(child, {style: {
              transitionDelay: transitionDelay + 'ms'
            }}) }
          </CSSTransition>
        })}
      </TransitionGroup>
    </main>
  )
}
