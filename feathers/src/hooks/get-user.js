// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars

/**
 * 
 * @param {*} context 
 * @param {*} post 
 * 
 * retrieve user object for given post
 * 
 */
const getUser = async (context, post) => {
  const result = await context.app.service('users').get(post.userId)

  const user = { ...result }

  delete user.password

  return user
}

module.exports = (options = {}) => {
  return async context => {
    // if method is find, do all posts, else do single
    if (context.method === 'find') {
      for (const post of context.result.data) {
        const user = await getUser(context, post)
        post.user = user
      }
    } else {
      const user = await getUser(context, context.result)
      context.result.user = user
    }

    return context
  }
}
