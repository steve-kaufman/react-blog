// const shell = require('shelljs')
// const path = require('path')
const { associate, sync } = require('../src/sequelize')

const clean = async () => {
  // shell.rm('-f', path.join(__dirname, 'test.db'))
  associate()
  await sync()
}

module.exports = {
  clean
}