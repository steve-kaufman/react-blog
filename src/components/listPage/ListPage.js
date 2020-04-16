import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export const ListPage = ({ children }) => {
  return (
    <main id='page-main'>
      <TransitionGroup appear={true} className='list-page'>
        {React.Children.map(children, (child, i) => { 
          const transitionDelay = i * 200
          console.log(transitionDelay)
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
