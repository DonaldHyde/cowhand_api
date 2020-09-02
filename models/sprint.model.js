const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sprintSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    projectId: {
      type: String,
      required: true,
    },
    startDate: Date,
    endDate: Date,
  },
  {
    timestamps: true,
  }
)

const Sprint = mongoose.model('Sprint', sprintSchema)

module.exports = Sprint
