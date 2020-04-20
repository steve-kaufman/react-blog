const { authenticate } = require('@feathersjs/authentication').hooks
const { keep } = require('feathers-hooks-common')

const associateUser = require('../../hooks/associate-user')

const disallowDuplicate = require('../../hooks/disallow-duplicate');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      associateUser(), 
      keep('like', 'userId', 'postId'), 
      disallowDuplicate('userId', 'postId')
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
