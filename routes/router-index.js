const router = require('express').Router()

// Auth
const loginRoute = require('./login.route')
const logoutRoute = require('./logout.route')
const registerRoute = require('./register.route')

// const usersRoute = require('./user.route')

const projectsRoute = require('./projects.route')
const sprintsRoute = require('./sprints.route')
const ticketsRoute = require('./tickets.route')

router.use('/login', loginRoute)
router.use('/logout', logoutRoute)
router.use('/register', registerRoute)

// router.use('/users', usersRoute)

router.use('/projects', projectsRoute) // tested
router.use('/sprints', sprintsRoute)
router.use('/tickets', ticketsRoute)

module.exports = router
