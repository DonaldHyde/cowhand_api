const router = require('express').Router()
const { confirmActiveSession } = require('../middleware/auth.middleware')
const Project = require('../models/project.model')
const Ticket = require('../models/ticket.model')

router.get('/', confirmActiveSession, async (req, res) => {
  const projects = await Project.find()

  res.json({ projects })
})

router.get('/:projectId', confirmActiveSession, async (req, res) => {
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

router.get('/:projectId/tickets', confirmActiveSession, async (req, res) => {
  const tickets = await Ticket.find({ projectId: req.params.projectId })

  res.json({ tickets })
})

router.post('/create', confirmActiveSession, async (req, res) => {
  if (!req.body.name)
    return res.status(400).json({ message: 'Must give the project a name' })
  if (await Project.findOne({ name: req.body.name }))
    return res.status(409).json({ message: 'Project name must be unique' })

  const newProject = new Project({
    name: req.body.name,
    creatorId: req.session.userId,
  })

  await newProject.save()

  return res.status(201).json({
    project: newProject,
  })
})

module.exports = router
