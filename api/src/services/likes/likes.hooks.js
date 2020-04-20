const { authenticate } = require('@feathersjs/authentication').hooks
const { iff, isProvider, disallow, discard, keep  } = require('feathers-hooks-common')

const associateUser = require('../../hooks/associate-user')
const requireSameUser = require('../../hooks/require-same-user')

const disallowDuplicate = require('../../hooks/disallow-duplicate');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [iff(isProvider('external'), discard('userId'))],
    get: [iff(isProvider('external'), discard('userId'))],
    create: [
      associateUser(), 
      keep('like', 'userId', 'postId'), 
      disallowDuplicate('userId', 'postId')
    ],
    update: [disallow('external')],
    patch: [requireSameUser(), keep('like')],
    remove: [requireSameUser()]
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
