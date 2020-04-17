import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './Messages.scss'
import { Icon } from '@iconify/react';
import closeIcon from '@iconify/icons-fa/close';

export const Messages = () => {
  const location = useLocation()

  const [messages, setMessages] = useState(location.state?.messages)

  const deleteMessage = (i) => {
    setMessages(messages.filter((message, index) => i !== index))
  }

  if (!messages) return null

  return (
    <TransitionGroup component={null}>
      {messages.map((message, i) => (
        <CSSTransition timeout={500} classNames='message-transition' key={i}>
          <div className="message">
            <p>
              {message}
              <button onClick={() => { deleteMessage(i) }}>
                <Icon icon={closeIcon} />
              </button>
            </p>
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}
