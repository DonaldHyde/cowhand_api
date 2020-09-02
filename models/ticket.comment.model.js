const mongoose = require('mongoose')

const Attachment = require('./ticket.attachment.model')

const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    comment: String,
    writtenBy: String,
    attachments: [{ type: Schema.ObjectId, ref: 'Attachment' }],
  },
  {
    timestamps: true,
  }
)

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
