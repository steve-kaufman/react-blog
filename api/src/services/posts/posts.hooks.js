const { authenticate } = require('@feathersjs/authentication').hooks;

const requireSameUser = require('../../hooks/require-same-user');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [requireSameUser()],
    update: [requireSameUser()],
    patch: [requireSameUser()],
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
};
