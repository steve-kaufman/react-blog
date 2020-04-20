const { authenticate } = require('@feathersjs/authentication').hooks
const { keep } = require('feathers-hooks-common')

const requireSameUser = require('../../hooks/require-same-user')
const associateUser = require('../../hooks/associate-user')

const getLikes = require('../../hooks/get-likes');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      associateUser(),
      keep('title', 'content', 'userId')
    ],
    update: [requireSameUser()],
    patch: [requireSameUser()],
    remove: [requireSameUser()]
  },

  after: {
    all: [],
    find: [getLikes()],
    get: [getLikes()],
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
