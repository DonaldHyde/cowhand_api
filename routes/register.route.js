const router = require('express').Router()
const { confirmNoActiveSession } = require('../middleware/auth.middleware')
const argon2 = require('argon2')

const User = require('../models/user.model')

// router.get('/', (req, res) => {
//   res.send('register page')
// })

router.post('/', confirmNoActiveSession, async (req, res) => {
  const { username, email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    console.log('create a new user')

    const hashedPassword = await argon2.hash(password)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    req.session.userId = newUser.id

    return res.json({
      message: 'Registration success',
      sessionActive: true,
    })
  }

  console.error('Error, email already assigned')
  res.status(401).json({
    message: 'Email already assigned to a user',
  })
})

module.exports = router
