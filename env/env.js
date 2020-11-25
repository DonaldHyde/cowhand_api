const FIFTEEN_MINUTES = 1000 * 60 * 15
const ONE_HOUR = 1000 * 60 * 60
const ONE_DAY = ONE_HOUR * 24
const FOURTEEN_DAYS = ONE_DAY * 14

const {
  PORT = 5000,
  NODE_ENV = 'development',
  MONGODB_URL = 'mongodb://mongo/cowhandio',
  COOKIE_NAME = 'cowhandRT',
  SESH_SECRET = 'thisisasecret!',
  SESH_LENGTH = FIFTEEN_MINUTES,
  REFRESH_SECRET = '!refreshsupersecret',
  REFRESH_LENGTH = ONE_DAY,
  REFRESH_LENGTH_REMEMBER = FOURTEEN_DAYS,
  SIGNED_COOKIE_SECRET = '!cookiesecretrecipe!',
} = process.env

module.exports = {
  PORT,
  MONGODB_URL,
  NODE_ENV,
  COOKIE_NAME,
  SESH_SECRET,
  SESH_LENGTH,
  REFRESH_SECRET,
  REFRESH_LENGTH,
  REFRESH_LENGTH_REMEMBER,
  SIGNED_COOKIE_SECRET,
}
