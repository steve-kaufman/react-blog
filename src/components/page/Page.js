import React, { useEffect, useContext } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useLocation } from 'react-router-dom'

import './Page.scss'

import { Messages } from './messages/Messages'

import { UIContext } from '../../context/UIContext'
import { setMenuOpen } from '../../actions'

export const Page = ({ className, children, messages, noTransition }) => {
  const location = useLocation()

  const [ui, dispatch] = useContext(UIContext)

  const items = [
    <Messages messages={messages} />,
    ...children
  ]

  useEffect(() => {
    window.scrollTo(0, 0)
    if (ui.menuIsOpen) {
      dispatch(setMenuOpen(false))
    }
  }, [location.pathname, messages])

  if (noTransition) {
    return (
      <main id='page-main' className={className}>
        {children}
      </main>
    )
  }

  return (
    <main id='page-main' className={className}>
      <TransitionGroup appear={true} className='list-page'>
        {React.Children.map(items, (child, i) => { 
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
