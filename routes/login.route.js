const router = require('express').Router()
// const { confirmActiveSession } = require('../middleware/auth.middleware')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const {
  COOKIE_NAME,
  SESH_SECRET,
  REFRESH_SECRET,
  REFRESH_LENGTH,
  REFRESH_LENGTH_REMEMBER,
} = require('../env/env')

// TODO: handle multiple logins? (does it matter? is there even anything I can do?)
router.post('/', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await argon2.verify(user.password, password))) {
    const token = jwt.sign({ userId: user.id }, SESH_SECRET, {
      expiresIn: '15m',
    })
    const refreshToken = jwt.sign({ userId: user.id }, REFRESH_SECRET, {
      expiresIn: user.remember ? '24h' : '14d',
    })

    req.session.refreshToken = refreshToken
    req.session.user = user

    return res.json({
      status: 'Logged In',
      token,
    })
  }

  console.error('Error, credentials invalid')
  res.status(401).json({
    message: 'Login credentials incorrect',
  })
})

// TODO: Remove this route
router.get('/status', (req, res) => {
  console.log('unsigned', req.cookies)
  console.log('signed', req.signedCookies)
  res.sendStatus(200)
})

module.exports = router
