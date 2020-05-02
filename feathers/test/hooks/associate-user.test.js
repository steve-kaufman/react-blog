const feathers = require('@feathersjs/feathers')
const associateUser = require('../../src/hooks/associate-user')

describe('\'associate-user\' hook', () => {
  let app

  beforeEach(() => {
    app = feathers()

    app.use('/posts', {
      async create(data) {
        return data
      }
    })

    app.service('posts').hooks({
      before: {
        create: associateUser()
      }
    })
  })

  it('adds a userId', async () => {
    const user = { id: Math.random() }

    const params = { user }
    const post = await app.service('posts').create({}, params)

    expect(post.userId).toBeTruthy()
  })

  it('matches given user.id', async () => {
    const user = { id: 'foo' }

    const params = { user }
    const post = await app.service('posts').create({}, params)

    expect(post.userId).toBe('foo')
  })
})