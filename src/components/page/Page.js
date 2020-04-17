import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import './Page.scss'

import { Messages } from './messages/Messages'

export const Page = ({ children }) => {
  const items = [
    <Messages />,
    ...children
  ]

  return (
    <main id='page-main'>
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
