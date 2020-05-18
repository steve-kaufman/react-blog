const { authenticate } = require('@feathersjs/authentication').hooks
const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks

const allowAnonymous = require('../../hooks/allow-anonymous')

module.exports = {
  before: {
    all: [],
    find: [allowAnonymous(), authenticate('jwt', 'anonymous')],
    get: [allowAnonymous(), authenticate('jwt', 'anonymous')],
    create: [hashPassword('password')],
    update: [hashPassword('password'), authenticate('jwt')],
    patch: [hashPassword('password'), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
