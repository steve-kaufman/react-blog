// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = (...uniqueFields) => {
  return async context => {
    // create a blank query object
    const query = {}

    // extract query information from context.data for each argument
    // ex. disallowDuplicate('userId') 
    // creates query: { userId: context.data.userId }
    uniqueFields.forEach(uniqueField => {
      query[uniqueField] = context.data[uniqueField]
    })

    // look for pre-existing object 
    const queryResult = await context.service.find({ query })

    const duplicates = queryResult.data

    // if there is a pre-existing object, don't allow service
    if (duplicates.length) {
      throw new Error('Cannot create duplicate object')
    }

    // no pre-existing object, service is allowed
    return context
  }
}
