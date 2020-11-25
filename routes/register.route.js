const router = require('express').Router()
const { confirmNoActiveSession } = require('../middleware/auth.middleware')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const { SESH_SECRET } = require('../env/env')

const User = require('../models/user.model')

router.post('/', async (req, res) => {
  const { username, email, password, remember } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    console.log('create a new user')

    const hashedPassword = await argon2.hash(password)

    // TODO: user setting for 'remember me' to set a long refresh token expiration
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      remember,
    })

    await newUser.save()

    const token = jwt.sign({ userId: newUser.id }, SESH_SECRET)

    return res.json({
      message: 'Registration success',
      token,
    })
  }

  console.error('Error, email already assigned')
  res.status(401).json({
    message: 'Email already assigned to a user',
  })
})

module.exports = router
