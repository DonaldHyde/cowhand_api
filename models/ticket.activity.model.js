const mongoose = require('mongoose')

const Schema = mongoose.Schema

const activitySchema = new Schema(
  {
    title: String,
    description: String,
    estimate: Number,
    sprintName: String,
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Completed'],
    },
    assignedTo: String,
    owner: String,
    team: String,
    project: String,
    editedBy: String,
  },
  {
    timestamps: true,
  }
)

const Activity = mongoose.model('Activity', activitySchema)

module.exports = Activity
