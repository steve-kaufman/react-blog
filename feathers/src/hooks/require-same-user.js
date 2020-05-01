// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    // retrieve object from db and get userId prop
    const { userId } = await context.service.get(context.id)

    // if userId does not match logged in user, don't allow service
    if (context.params.user.id !== userId) {
      throw new Error(`This object does not belong to ${context.params.user.email}`)
    }

    // userId does match logged in user, allow service
    return context
  }
}
