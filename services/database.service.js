const mongoose = require('mongoose')
const { MONGODB_URL } = require('../env/env')

module.exports.initializeDatabase = () => {
  mongoose.connect(MONGODB_URL)

  console.log('Establishing MongoDB Connection . . .')

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error'))
  db.once('open', () => {
    console.log('Mongo Connection Completed!')
  })
}
