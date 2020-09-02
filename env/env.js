const TWO_HOURS = 1000 * 60 * 60 * 2

const {
  PORT = 5000,
  NODE_ENV = 'development',
  MONGODB_URL = 'mongodb://mongo/cowhandio',
  SESH_NAME = 'cowhandio',
  SESH_SECRET = 'thisisasecret!',
  SESH_LENGTH = TWO_HOURS,
} = process.env

module.exports = {
  PORT,
  MONGODB_URL,
  NODE_ENV,
  SESH_NAME,
  SESH_SECRET,
  SESH_LENGTH,
}
