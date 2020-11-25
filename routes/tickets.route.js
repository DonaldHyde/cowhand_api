const router = require('express').Router()
const { requireToken } = require('../middleware/auth.middleware')

const Ticket = require('../models/ticket.model')
// const Activity = require('../models/ticket.activity.model.js')
// const Attachment = require('../models/ticket.attachment.model.js')
// const Comment = require('../models/ticket.comment.model.js')

const Project = require('../models/project.model')

const FILTER = {
  projectId: 'projectId',
  sprintId: 'sprintId',
}

router.get('/', requireToken, async (req, res) => {
  // if (!FILTER[req.body.filter])
  //   return res.json({ tickets: [await Ticket.find()] })
  // if (!req.body[req.body.filter])
  //   return res.json({ tickets: [await Ticket.find()] })

  Ticket.find({ [req.body.filter]: req.body[req.body.filter] })
    .then((tickets) => {
      if (tickets) return res.json({ tickets })
    })
    .catch((err) => {
      res.status(400).json({
        message: 'Request invalid',
      })
    })
})

router.get('/:ticketId', requireToken, async (req, res) => {
  Ticket.findById(req.params.ticketId)
    .then((ticket) => {
      if (ticket) return res.json({ ticket })

      res.status(404).json({
        message: "Ticket doesn't exist",
      })
    })
    .catch((err) => {
      res.status(400).json({
        message: 'Request invalid',
      })
    })
})

// TODO: validate sprint to its project
router.post('/create', requireToken, async (req, res) => {
  if (!Project.findById(req.body.projectId))
    return res.status(400).json({ message: 'Invalid project id' })
  if (!req.body.title)
    return res.status(400).json({ message: 'Must give the sprint a title' })
  // title, createdBy, projectId

  const newTicket = new Ticket({
    title: req.body.title,
    projectId: req.body.projectId,
    createdBy: req.userId,
    ...req.body,
  })

  await newTicket.save()

  res.status(201).json({ ticket: newTicket })
})

module.exports = router
