const { authenticate } = require('@feathersjs/authentication').hooks
const { keep } = require('feathers-hooks-common')

const requireSameUser = require('../../hooks/require-same-user')
const associateUser = require('../../hooks/associate-user')
const getLikes = require('../../hooks/get-likes')
const getUser = require('../../hooks/get-user')
const allowAnonymous = require('../../hooks/allow-anonymous')

const queryByUserEmail = require('../../hooks/query-by-user-email');

module.exports = {
  before: {
    all: [],
    find: [allowAnonymous(), authenticate('jwt', 'anonymous'), queryByUserEmail()],
    get: [allowAnonymous(), authenticate('jwt', 'anonymous')],
    create: [
      authenticate('jwt'),
      associateUser(),
      keep('title', 'content', 'userId')
    ],
    update: [authenticate('jwt'), requireSameUser()],
    patch: [authenticate('jwt'), requireSameUser()],
    remove: [authenticate('jwt'), requireSameUser()]
  },

  after: {
    all: [getUser(), getLikes()],
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
