// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if (context.method === 'find') {
      context.result.data.forEach(obj => {
        if (obj.userId !== context.params.user.id) {
          delete obj.userId
        }
      });
      
      return context
    }

    if (context.result.userId !== context.params.user.id) {
      delete context.result.userId
    }

    return context;
  };
};
