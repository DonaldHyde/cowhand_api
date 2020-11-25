const { SESH_SECRET } = require('../env/env')

function generateToken(userId) {
  return jwt.sign({ userId }, SESH_SECRET)
}

function generateRefreshToken(userId) {
  return jwt.sign({ userId }, REFRESH_SECRET)
}

function validateToken(token) {
  return jwt.verify(token, SESH_SECRET)
}

function validateRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET)
}

module.exports = {
  generateToken,
  generateRefreshToken,
  validateToken,
  validateRefreshToken,
}
