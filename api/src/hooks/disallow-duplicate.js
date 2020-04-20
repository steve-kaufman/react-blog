// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (...uniqueFields) => {
  return async context => {
    const query = {}

    uniqueFields.forEach(uniqueField => {
      query[uniqueField] = context.data[uniqueField]
    })

    const queryResult = await context.app.service('likes').find({ query })

    const duplicates = queryResult.data

    if (duplicates.length) {
      throw new Error('User cannot like same post more than once')
    }

    return context;
  };
};
