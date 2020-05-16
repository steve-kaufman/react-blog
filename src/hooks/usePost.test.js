import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { usePost } from './usePost'
import api from '../__mocks__/api'

jest.mock('../api')

const TestComponent = ({ post, auth }) => {
  const { likes, dislikes, thumbs, toggleThumb } = usePost(post, auth)

  return (
    <div>
      <p data-testid='likes'>{likes}</p>
      <p data-testid='dislikes'>{dislikes}</p>
      <button 
        data-testid='thumbs-up' 
        onClick={() => { toggleThumb('up') }}
      >{thumbs.up ? 'yes' : null}</button>
      <button 
        data-testid='thumbs-down' 
        onClick={() => { toggleThumb('down') }}
      >{thumbs.down ? 'yes' : null}</button>
    </div>
  )
}

describe('usePost', () => {
  const fakeAuth = {
    user: true
  }

  let fakePost

  beforeEach(() => {
    fakePost = {
      title: 'foo',
      content: 'bar',
      userLiked: false,
      likes: 0,
      dislikes: 0
    }
  })

  it('sets both thumbs false by default', () => {
    // arrange
    const { getByTestId } = render(<TestComponent 
      post={fakePost} 
      auth={fakeAuth}
    />)

    // act
    const thumbsUp = getByTestId('thumbs-up')
    const thumbsDown = getByTestId('thumbs-down')

    // assert
    expect(thumbsUp).toBeEmpty()
    expect(thumbsDown).toBeEmpty()
  })

  it('sets likes and dislikes when 0', () => {
    // arrange
    const { getByTestId } = render(<TestComponent 
      post={fakePost} 
      auth={fakeAuth}
    />)

    // act
    const likes = getByTestId('likes')
    const dislikes = getByTestId('dislikes')

    // assert
    expect(likes).toHaveTextContent(0)
    expect(dislikes).toHaveTextContent(0)
  })

  it('changes likes and dislikes when not zero', () => {
    // arrange
    fakePost.likes = 1
    fakePost.dislikes = 2
    const { getByTestId } = render(<TestComponent 
      post={fakePost} 
      auth={fakeAuth}
    />)

    // act
    const likes = getByTestId('likes')
    const dislikes = getByTestId('dislikes')

    // assert
    expect(likes).toHaveTextContent(1)
    expect(dislikes).toHaveTextContent(2)
  })

  it('sets thumbs up when user has liked', () => {
    // arrange
    fakePost.userLiked = {
      id: 1,
      like: 1
    }
    const { getByTestId } = render(<TestComponent 
      post={fakePost} 
      auth={fakeAuth}
    />)

    // act
    const thumbsUp = getByTestId('thumbs-up')
    const thumbsDown = getByTestId('thumbs-down')

    // assert
    expect(thumbsUp).toHaveTextContent('yes')
    expect(thumbsDown).toBeEmpty()
  })

  it('sets thumbs down when user has disliked', () => {
    // arrange
    fakePost.userLiked = {
      id: 1,
      like: 0
    }
    const { getByTestId } = render(<TestComponent 
      post={fakePost} 
      auth={fakeAuth}
    />)

    // act
    const thumbsUp = getByTestId('thumbs-up')
    const thumbsDown = getByTestId('thumbs-down')

    // assert
    expect(thumbsUp).toBeEmpty()
    expect(thumbsDown).toHaveTextContent('yes')
  })

  // it('creates a dislike when user clicks dislike', () => {
  //   // arrange
  //   const { getByTestId } = render(<TestComponent 
  //     post={fakePost} 
  //     auth={fakeAuth}
  //   />)
  //   const thumbsDown = getByTestId('thumbs-down')

  //   // act
  //   thumbsDown.click()

  //   // assert
  //   expect(api.service).toHaveBeenCalledTimes(2)
  //   expect(api.create).toHaveBeenCalledTimes(1)
  //   expect(api.get).toHaveBeenCalledTimes(1)
  // })
})
