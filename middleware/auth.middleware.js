const { SESH_SECRET } = require('../env/env')
const jwt = require('jsonwebtoken')

module.exports = {
  // redirectToHome: (req, res, next) => {
  //   const userId = req.session.userId

  //   if (userId) {
  //     return res.redirect('/home')
  //   }

  //   next()
  // },
  // redirectToLogin: (req, res, next) => {
  //   const userId = req.session.userId

  //   if (!userId) {
  //     return res.redirect('/home')
  //   }

  //   next()
  // },
  // TODO: better validation
  parseToken: (req, res, next) => {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')
      // console.log('bearerToken:', bearerToken)
      const token = bearerToken[1]
      // console.log('token:', token)
      req.token = token
    }

    next()
  },
  requireToken: (req, res, next) => {
    if (!req.token) return res.sendStatus(403)
    console.log('req token:', req.token)

    try {
      const token = jwt.verify(req.token, SESH_SECRET)
      console.log('token:', token)
      req.userId = token.userId
      next()
    } catch (err) {
      res.sendStatus(403)
    }
  },
  confirmNoActiveSession: (req, res, next) => {
    if (!req.userId) {
      return next()
    }

    res.status(202).json({
      message: 'Session active',
      sessionActive: true,
    })
  },
  confirmActiveSession: (req, res, next) => {
    if (req.userId) {
      return res.status(202).json({
        message: 'Session active',
        sessionActive: true,
      })
    }

    next()
  },
}
