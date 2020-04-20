const app = require('../../src/app')

describe('\'likes\' service', () => {
  const userInfo = {
    email: 'someone@example.com',
    password: 'supersecret'
  }

  const dummyPost = {
    title: 'foo',
    content: 'bar'
  }

  let like, user, post

  beforeAll(async () => {
    await app.setup()

    try {
      user = await app.service('users').create(userInfo)
    } catch (error) {
      const queryResult = await app.service('users').find({ query: {
        email: userInfo.email
      } })
      user = queryResult.data[0]
    }

    post = await app.service('posts').create(dummyPost, { user })

    like = await app.service('likes').create(
      { like: true, postId: post.id}, 
      { user }
    )
  })

  it('registered the service', () => {
    const service = app.service('likes')
    expect(service).toBeTruthy()
  })

  describe('create', () => {
    it('associates a user', () => {
      expect(like.userId).toBe(user.id)
    })
    it('associates a post', () => {
      expect(like.postId).toBe(post.id)
    })
    
    it('cannot create a duplicate', () => {
      expect.assertions(1)

      try {
        app.service('likes').create({ like: true, postId: post.id }, user)
      } catch (e) {
        expect(e).toBeTruthy()
      }
    })
  })
})
