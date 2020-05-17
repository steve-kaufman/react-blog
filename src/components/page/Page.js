import React, { useEffect, useContext } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useLocation } from 'react-router-dom'

import './Page.scss'

import { Messages } from './messages/Messages'

import { UIContext } from '../../context'
import { setMenuOpen } from '../../actions'

export const Page = (props) => {
  const location = useLocation()

  const [uiState, dispatch] = useContext(UIContext)

  // const refresh = () => {
  //   window.scrollTo(0, 0)
  //   if (ui.menuIsOpen) {
  //     dispatch(setMenuOpen(false))
  //   }
  // }

  // useEffect(refresh , [location.pathname, location.state, props.messages])

  // useEffect(() => {
  //   if (history.location.state?.messages) {
  //     setLocationMessages()

  //     history.replace(
  //       history.location.pathname, 
  //       { ...history.location.state, messages: undefined }
  //     )
  //   }
  // }, [history])

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(setMenuOpen(false))
  }, [dispatch, location.pathname])

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
      <Messages messages={uiState.messages} />
      {/* <Messages messages={ history.location.state?.messages || [] } /> */}
      <TransitionGroup appear={true} className='list-page'>
        {React.Children.map(children, (child, i) => { 
          const transitionDelay = i * 200
          return (
            <CSSTransition 
              key={i} 
              timeout={800 + transitionDelay} 
              classNames='page-item'
            >
              { React.cloneElement(child, {
                style: { transitionDelay: transitionDelay + 'ms' },
              }) }
            </CSSTransition>
          )
        })}
      </TransitionGroup>
    </main>
  )
}
