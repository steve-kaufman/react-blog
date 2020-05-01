const Sequelize = require('sequelize')

let sequelize

const associate = () => {
  const models = sequelize.models
  Object.keys(models).forEach(name => {
    if ('associate' in models[name]) {
      models[name].associate(models)
    }
  })
}

const sync = async () => {
  associate()

  await sequelize.sync()

  console.log('synced')
}

const configure = (app) => {
  const connectionString = app.get('sqlite')
  sequelize = new Sequelize(connectionString, {
    dialect: 'sqlite',
    logging: false,
    define: {
      freezeTableName: true
    }
  })

  app.set('sequelizeClient', sequelize)
}

configure.sync = sync

module.exports = configure