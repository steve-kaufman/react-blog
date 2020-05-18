import React, { useContext } from 'react'
// import { useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './Messages.scss'
import { Icon } from '@iconify/react';
import closeIcon from '@iconify/icons-fa/close';
import { UIContext } from '../../../context';
import { deleteMessage } from '../../../actions';

export const Messages = (props) => {
  const [uiState, dispatch] = useContext(UIContext)

  const { messages } = uiState

  return (
    <TransitionGroup component={null} appear={true}>
      {messages.map((message, i) => (
        <CSSTransition timeout={500} classNames='message-transition' key={i}>
          <div className={`message message-${message.type}`}>
            <p>
              <span className='content'>{message.content}</span>
              <button onClick={() => { dispatch(deleteMessage(i)) }}>
                <Icon icon={closeIcon} />
              </button>
            </p>
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}
