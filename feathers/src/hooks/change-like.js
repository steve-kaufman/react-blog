// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const queryResult = await context.service.find({ query: { 
      userId: context.params.user.id, 
      postId: context.data.postId 
    }})
    
    if (!queryResult.data.length) {
      // like object does not exist, continue with create method
      return context
    }

    // like object already exists, patch instead
    const like = await context.service.patch(queryResult.data[0].id, {
      like: context.data.like
    }, { user: context.params.user })

    context.result = like
    return context
  };
};
