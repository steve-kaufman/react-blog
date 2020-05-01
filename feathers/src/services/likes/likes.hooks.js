const { authenticate } = require('@feathersjs/authentication').hooks
const { iff, isProvider, disallow, discard, keep } = require('feathers-hooks-common')

const associateUser = require('../../hooks/associate-user')
const requireSameUser = require('../../hooks/require-same-user')
const hideUserId = require('../../hooks/hide-user-id')

const disallowDuplicate = require('../../hooks/disallow-duplicate')

const changeLike = require('../../hooks/change-like');


module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      associateUser(),
      keep('like', 'userId', 'postId'),
      disallowDuplicate('like', 'userId', 'postId'),
      changeLike()
    ],
    update: [disallow('external')],
    patch: [requireSameUser(), keep('like')],
    remove: [requireSameUser()]
  },

  after: {
    all: [iff(isProvider('external'), hideUserId())],
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
