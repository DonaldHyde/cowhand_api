module.exports = {
  redirectToHome: (req, res, next) => {
    const userId = req.session.userId

    if (userId) {
      return res.redirect('/home')
    }

    next()
  },
  redirectToLogin: (req, res, next) => {
    const userId = req.session.userId

    if (!userId) {
      return res.redirect('/home')
    }

    next()
  },
  confirmActiveSession: (req, res, next) => {
    if (req.session.userId) {
      return next()
    }

    res.status(401).json({
      message: 'No active session',
      sessionActive: false,
    })
  },
  confirmNoActiveSession: (req, res, next) => {
    if (!req.session.userId) {
      return next()
    }

    res.status(202).json({
      message: 'Session active',
      sessionActive: true,
    })
  },
}
