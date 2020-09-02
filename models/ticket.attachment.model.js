const mongoose = require('mongoose')

const Schema = mongoose.Schema

const attachmentSchema = new Schema(
  {
    filename: String,
    url: String,
    attachedBy: String,
  },
  {
    timestamps: true,
  }
)

const Attachment = mongoose.model('Attachment', attachmentSchema)

module.exports = Attachment
