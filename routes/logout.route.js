const router = require('express').Router()

const { COOKIE_NAME } = require('../env/env')

// Clears the refresh token from the cookie
// Up to the client to forget the token
router.post('/', (req, res) => {
  res.clearCookie(COOKIE_NAME)

  res.status(200).send({ status: 'Logged Out' })
})

module.exports = router
