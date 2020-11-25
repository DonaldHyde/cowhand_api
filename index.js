const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const bodyParser = require('body-parser')
const cors = require('cors')

const { initializeDatabase } = require('./services/database.service')
const { parseToken } = require('./middleware/auth.middleware')

const {
  PORT,
  SIGNED_COOKIE_SECRET,
  NODE_ENV,
  REFRESH_LENGTH_REMEMBER,
  REFRESH_LENGTH,
  COOKIE_NAME,
} = require('./env/env')

const app = express()

const db = initializeDatabase()

// TODO: handle http (dev) vs. https (prod)

app.use(cors())

app.use(
  session({
    name: COOKIE_NAME,
    secret: SIGNED_COOKIE_SECRET,
    resave: false,
    secure: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db }),
    sameSite: false,
    cookie: {
      secure: NODE_ENV === 'production',
      maxAge: REFRESH_LENGTH_REMEMBER,
      sameSite: false,
      // Date.now() + (user.remember ? REFRESH_LENGTH_REMEMBER : REFRESH_LENGTH),
    },
  })
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(parseToken)

const apiRoutes = require('./routes/router-index')
app.use('/api/v1', apiRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
