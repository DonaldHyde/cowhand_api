const router = require('express').Router()
const { redirectToLogin } = require('../middleware/auth.middleware')

const { SESH_NAME } = require('../env/env')

router.post('/', (req, res) => {
  req.session.destroy((err) => {
    if (err) console.error('Error:', err)

    res.clearCookie(SESH_NAME)

    res.send({
      message: 'Logged out',
      sessionActive: false,
    })
  })
})

module.exports = router
