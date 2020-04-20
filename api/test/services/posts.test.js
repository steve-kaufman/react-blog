const app = require('../../src/app')

describe('\'posts\' service', () => {
  it('registered the service', () => {
    const service = app.service('posts')
    expect(service).toBeTruthy()
  })

  describe('create', () => {
    let user

    const dummyUser = {
      email: 'someone@example.com',
      password: 'supersecret'
    }

    const dummyPost = {
      title: 'foo',
      content: 'bar'
    }

    beforeAll(async () => {
      app.setup()

      try {
        user = await app.service('users').create(dummyUser)
      } catch (error) {
        const queryResult = await app.service('users').find({ query: {
          email: dummyUser.email
        } })
        user = queryResult.data[0]
      }
    })

    it('creates a post with the current user', async () => {
      const post = await app.service('posts').create(dummyPost, { user })

      expect(post.userId).toBe(user.id)
    })
  })
})
