const feathers = require('@feathersjs/feathers')
const memory = require('feathers-memory')
const disallowDuplicate = require('../../src/hooks/disallow-duplicate')

describe('\'disallow-duplicate\' hook', () => {
  let app

  beforeEach(() => {
    app = feathers()

    const options = {
      paginate: {
        default: 10, max: 50
      }
    }

    app.use('/likes', memory(options))

    app.service('likes').hooks({
      before: {
        create: disallowDuplicate('userId, postId')
      }
    })
  })

  it('allows an object that is not a duplicate', async () => {
    const like = await app.service('likes').create({ 
      userId: Math.random(), 
      postId: Math.random()
    })

    expect(like).toBeTruthy()
  })

  it('does not interfere with data', async () => {
    const like = await app.service('likes').create({ 
      userId: 'foo', 
      postId: 'bar'
    })

    expect(like.userId).toBe('foo')
    expect(like.postId).toBe('bar')
  })

  it('does not allow a duplicate object', async () => {
    expect.assertions(1)

    // create the first object
    await app.service('likes').create({ 
      userId: 'foo', 
      postId: 'bar'
    })

    // try to create a duplicate object
    try {
      await app.service('likes').create({
        userId: 'foo',
        postId: 'bar'
      })
    } 
    catch (e) {
      expect(e.message).toMatch(/cannot create duplicate object/i)
    }
  })
})
