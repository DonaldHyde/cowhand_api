const router = require('express').Router()
const { confirmActiveSession } = require('../middleware/auth.middleware')
const Sprint = require('../models/sprint.model')
const Project = require('../models/project.model')
const Ticket = require('../models/ticket.model')

router.get('/', confirmActiveSession, async (req, res) => {
  const sprints = await Sprint.find()

  res.json({ sprints })
})

router.get('/:sprintId', confirmActiveSession, async (req, res) => {
  const sprint = await Sprint.findById(req.params.sprintId)

  if (sprint) {
    return res.json({ sprint })
  }

  res.status(404).json({
    message: "Sprint doesn't exist",
  })
})

router.get('/:sprintId/tickets', confirmActiveSession, async (req, res) => {
  const tickets = await Ticket.find({ sprintId: req.params.sprintId })

  res.json({ tickets })
})

router.post('/create', confirmActiveSession, async (req, res) => {
  if (!(await Project.findById(req.body.projectId)))
    return res.status(409).json({ message: 'Invalid project id' })
  if (!req.body.name)
    return res.status(400).json({ message: 'Must provide sprint name' })

  const newSprint = new Sprint({
    name: req.body.name,
    projectId: req.body.projectId,
    creator: req.session.userId,
  })

  await newSprint.save()

  return res.status(201).json({
    sprint: newSprint,
  })
})

module.exports = router
