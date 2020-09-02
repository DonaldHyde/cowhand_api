const mongoose = require('mongoose')

const Activity = require('./ticket.activity.model.js')
const Attachment = require('./ticket.attachment.model.js')
const Comment = require('./ticket.comment.model.js')

const Schema = mongoose.Schema

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    estimate: Number,
    sprintName: String,
    status: {
      type: String,
      default: 'To Do',
      enum: ['To Do', 'In Progress', 'Completed'],
    },
    assignedTo: String,
    owner: String,
    team: String,
    projectId: {
      type: String,
      required: true,
    },
    sprintId: String,
    createdBy: {
      type: String,
      required: true,
    },
    attachments: [{ type: Schema.ObjectId, ref: 'Attachment' }],
    activity: [{ type: Schema.ObjectId, ref: 'Activity' }],
    comments: [{ type: Schema.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  }
)

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket
