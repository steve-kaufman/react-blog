// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    // get userId from authenticated user
    const userId = context.params.user.id

    // add userId to context.data
    context.data = { ...context.data, userId }

    return context
  }
}
