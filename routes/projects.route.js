const router = require('express').Router()
const { requireToken } = require('../middleware/auth.middleware')
const Project = require('../models/project.model')
const Ticket = require('../models/ticket.model')

router.get('/', requireToken, async (req, res) => {
  console.log('session:', req.session)

  const projects = await Project.find()

  res.json({ projects })
})

router.get('/:projectId', requireToken, async (req, res) => {
  Project.findById(req.params.projectId)
    .then((project) => {
      if (project) return res.json({ project })

      res.status(404).json({
        message: "Project doesn't exist",
      })
    })
    .catch((err) => {
      res.status(400).json({
        message: 'Request invalid',
      })
    })
})

router.get('/:projectId/tickets', requireToken, async (req, res) => {
  const tickets = await Ticket.find({ projectId: req.params.projectId })

  res.json({ tickets })
})

router.post('/create', requireToken, async (req, res) => {
  if (!req.body.name)
    return res.status(400).json({ message: 'Must give the project a name' })
  if (await Project.findOne({ name: req.body.name }))
    return res.status(409).json({ message: 'Project name must be unique' })

  // console.log('token (id):', req.locals.token)

  const newProject = new Project({
    name: req.body.name,
    creatorId: req.userId,
  })

  await newProject.save()

  return res.status(201).json({
    project: newProject,
  })
})

module.exports = router
