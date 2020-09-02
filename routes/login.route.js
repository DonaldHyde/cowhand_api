const router = require('express').Router()
const { confirmNoActiveSession } = require('../middleware/auth.middleware')
const argon2 = require('argon2')
const User = require('../models/user.model')

router.post('/', confirmNoActiveSession, async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await argon2.verify(user.password, password))) {
    req.session.userId = user.id

    return res.json({
      message: 'Login success',
      sessionActive: true,
    })
  }

  console.error('Error, credentials invalid')
  res.status(401).json({
    message: 'Login credentials incorrect',
  })
})

router.get('/status', (req, res) => {
  let sessionActive = false

  if (req.session.userId) {
    sessionActive = true
  }

  res.json({
    message: sessionActive ? 'Session active' : 'Session not active',
    sessionActive,
  })
})

module.exports = router
