const app = require('../../src/app')
const { clean } = require('../testUtils')

describe('\'posts\' service', () => {
  let user

  beforeAll(async () => {
    await clean()

    user = await app.service('users').create({
      email: 'post@example.com',
      password: 'password'
    })
  })

  it('registered the service', () => {
    const service = app.service('posts')
    expect(service).toBeTruthy()
  })

  it('associates a user', async () => {
    const post = await app.service('posts').create({
      title: 'foo', content: 'bar'
    }, { user })

    expect(post.user.id).toEqual(user.id)
  })

  it('gets number of likes and dislikes', async () => {
    // create a dummy post
    let post = await app.service('posts').create({
      title: 'foo', content: 'bar'
    }, { user })
    
    // should have no likes or dislikes to start
    expect(post.likes).toBe(0)
    expect(post.dislikes).toBe(0)

    // create a like
    await app.service('likes').create({ 
      like: true, postId: post.id 
    }, { user })
    post = await app.service('posts').get(post.id)

    // should have one like and no dislikes
    expect(post.likes).toBe(1)
    expect(post.dislikes).toBe(0)

    // switch user opinion to dislike
    await app.service('likes').create({
      like: false, postId: post.id
    }, { user })
    post = await app.service('posts').get(post.id)

    // should have one dislike and no likes
    expect(post.likes).toBe(0)
    expect(post.dislikes).toBe(1)
  })

  describe('find', () => {
    it('gets a list of posts', async () => {
      const post1 = await app.service('posts').create({
        title: 'foo1', content: 'bar1'
      }, { user })
      const post2 = await app.service('posts').create({
        title: 'foo2', content: 'bar2'
      }, { user })

      const posts = await app.service('posts').find()

      expect(posts).toBeTruthy()

      const foundPost = posts.data.find(post => post.id === post1.id)

      expect(foundPost.title).toBe(post1.title)
      expect(foundPost.content).toBe(post1.content)
    })
  })
})
