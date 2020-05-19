// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { app, params: { query } } = context

    // Skip hook if email isn't provided
    if (!query.email) return

    // Get user by email
    const { data: [user] } = await app.service('users').find({
      query: {
        email: query.email
      }
    })

    // Remove email from query and replace it with userId
    delete query.email
    query.userId = user.id

    return context
  }
}
