const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

const { initializeDatabase } = require('./services/database.service')

const User = require('./models/user.model')

const app = express()

const {
  PORT,
  NODE_ENV,
  SESH_NAME,
  SESH_SECRET,
  SESH_LENGTH,
} = require('./env/env')

const IN_PROD = NODE_ENV === 'production'

app.use(
  session({
    cookie: {
      maxAge: SESH_LENGTH,
      secure: IN_PROD,
      sameSite: true,
    },
    secret: SESH_SECRET,
    name: SESH_NAME,
    resave: false,
    saveUninitialized: false,
  })
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

initializeDatabase()

// Stash user in locals
app.use(async function (req, res, next) {
  const userId = req.session.userId

  if (userId) {
    const user = await User.findById(userId)
    res.locals.user = user
  }

  next()
})

const apiRoutes = require('./routes/router-index')
app.use('/api/v1', apiRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
