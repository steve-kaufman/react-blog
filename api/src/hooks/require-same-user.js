// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { userId } = await context.service.get(context.id)

    if (context.params.user.id !== userId) {
      throw new Error(`This object does not belong to ${ context.params.user.email }`)
    }

    return context;
  };
};
