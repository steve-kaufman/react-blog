const app = require('../../src/app')
const { clean } = require('../testUtils')

describe('\'likes\' service', () => {
  let user, post

  beforeAll(async () => {
    await clean()

    user = await app.service('users').create({
      email: 'likes@example.com',
      password: 'password'
    })
  })

  it('registered the service', () => {
    const service = app.service('likes')
    expect(service).toBeTruthy()
  })

  it('has a like prop', async () => {
    // arrange
    const post = await app.service('posts').create({
      title: 'foo',
      content: 'bar'
    }, { user })
    const post2 = await app.service('posts').create({
      title: 'foo',
      content: 'bar'
    }, { user })

    // act
    const like = await app.service('likes').create({
      like: true, postId: post.id
    }, { user })
    const like2 = await app.service('likes').create({
      like: false, postId: post2.id
    }, { user })

    // assert
    expect(like.like).toBe(true)
    expect(like2.like).toBe(false)
  })

  it('does not allow a duplicate', async () => {
    expect.assertions(1)
    // arrange
    const post = await app.service('posts').create({
      title: 'foo',
      content: 'bar'
    }, { user })
    const like = await app.service('likes').create({
      like: true, postId: post.id
    }, { user })

    // act
    try {
      const like2 = await app.service('likes').create({
        like: true, postId: post.id
      }, { user })
    } catch (e) {
      // assert
      expect(e.message).toMatch(/cannot create duplicate object/i)
    }
  })

  it('will patch if object already exists', async () => {
    // arrange
    const post = await app.service('posts').create({
      title: 'foo',
      content: 'bar'
    }, { user })
    const like = await app.service('likes').create({
      like: true, postId: post.id
    }, { user })

    // act
    const changedLike = await app.service('likes').create({
      like: false, postId: post.id
    }, { user })

    // assert
    expect(like.id).toBe(changedLike.id)
  })
})
