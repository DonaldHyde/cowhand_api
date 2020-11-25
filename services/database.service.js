const mongoose = require('mongoose')
const { MONGODB_URL } = require('../env/env')

const initDBDefaults = require('../dev/db.defaults')
const { init } = require('../models/user.model')

module.exports.initializeDatabase = () => {
  mongoose.connect(MONGODB_URL)

  console.log('Establishing MongoDB Connection . . .')

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error'))
  db.once('open', () => {
    console.log('Mongo Connection Completed!')
  })

  initDBDefaults()

  return db
}
