const router = require('express').Router()
const { confirmActiveSession } = require('../middleware/auth.middleware')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const {
  COOKIE_NAME,
  SESH_SECRET,
  REFRESH_SECRET,
  // REFRESH_LENGTH,
  // REFRESH_LENGTH_REMEMBER,
} = require('../env/env')

router.post('/', async (req, res) => {
  console.log('refresh req session:', req.session)
  // console.log('signed cookies:', req.signedCookies)
  // console.log('normal cookies:', req.cookies)
  // if (!req.signedCookies[COOKIE_NAME]) return res.sendStatus(403)
  if (!req.session.refreshToken) return res.sendStatus(403)

  try {
    const refreshToken = jwt.verify(req.session.refreshToken, REFRESH_SECRET)

    const token = jwt.sign({ userId: refreshToken.userId }, SESH_SECRET)

    res.json({
      token,
    })
  } catch (err) {
    res.sendStatus(403)
  }
})

module.exports = router
