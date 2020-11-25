const Project = require('../models/project.model')
const Sprint = require('../models/sprint.model')
// const Team = require('../models/Team.model')
const Ticket = require('../models/ticket.model')
const Activity = require('../models/ticket.activity.model')
const Attachment = require('../models/ticket.attachment.model')
const Comment = require('../models/ticket.comment.model')
const User = require('../models/user.model')
const { getMaxListeners } = require('../models/user.model')

const argon2 = require('argon2')

async function initDBDefaults() {
  // build users
  const users = await User.insertMany([
    {
      username: 'donnie',
      email: 'donnie@gmail.com',
      password: await argon2.hash('password'),
      remember: false,
    },
    {
      username: 'rosa',
      email: 'rosa@gmail.com',
      password: await argon2.hash('password'),
      remember: false,
    },
  ]).catch((err) => console.log(err))
  console.log('users', users)

  // build projects
  const projects = await Project.insertMany([
    {
      name: 'Cowhand.io',
      creatorId: users[0]._id,
    },
    {
      name: 'Just Draft',
      creatorId: users[0]._id,
    },
    {
      name: 'Chat App',
      creatorId: users[1]._id,
    },
  ]).catch((err) => console.log(err))
  console.log('projects', projects)

  const sprints = await Sprint.insertMany([
    {
      name: 'Cowhand Sprint 1',
      projectId: projects[0]._id,
      creatorId: users[0]._id,
    },
    {
      name: 'Cowhand Sprint 2',
      projectId: projects[0]._id,
      creatorId: users[0]._id,
    },
    {
      name: 'Cowhand Sprint 3',
      projectId: projects[0]._id,
      creatorId: users[0]._id,
    },
    {
      name: 'Just Draft Sprint 1',
      projectId: projects[1]._id,
      creatorId: users[1]._id,
    },
    {
      name: 'Just Draft Sprint 2',
      projectId: projects[1]._id,
      creatorId: users[1]._id,
    },
  ]).catch((err) => console.log(err))
  console.log('sprints', sprints)

  const tickets = await Ticket.insertMany([
    {
      title: 'New Feature 0',
      projectId: projects[0]._id,
      sprintId: sprints[0]._id,
      creatorId: users[0]._id,
      description: 'This is a ticket description',
    },
    {
      title: 'New Feature 1',
      projectId: projects[0]._id,
      sprintId: sprints[0]._id,
      creatorId: users[0]._id,
      description: 'This is a ticket description',
    },
    {
      title: 'New Feature 2',
      projectId: projects[0]._id,
      sprintId: sprints[0]._id,
      creatorId: users[0]._id,
      description: 'This is a ticket description',
    },
    {
      title: 'New Feature 3',
      projectId: projects[0]._id,
      sprintId: sprints[1]._id,
      creatorId: users[0]._id,
      description: 'This is a ticket description',
    },
    {
      title: 'New Feature 4',
      projectId: projects[0]._id,
      sprintId: sprints[1]._id,
      creatorId: users[0]._id,
      description: 'This is a ticket description',
    },
    {
      title: 'New Feature 5',
      projectId: projects[0]._id,
      sprintId: sprints[3]._id,
      creatorId: users[0]._id,
      description: 'This is a ticket description',
    },
    {
      title: 'New Feature 6',
      projectId: projects[0]._id,
      // sprintId: sprints[2]._id,
      creatorId: users[0]._id,
      description: 'This is a ticket description',
    },
    {
      title: 'New Feature 7',
      projectId: projects[0]._id,
      // sprintId: sprints[0]._id,
      creatorId: users[0]._id,
      description: 'This is a ticket description',
    },
    {
      title: 'New Feature 8',
      projectId: projects[1]._id,
      sprintId: sprints[3]._id,
      creatorId: users[0]._id,
      description: 'This is a ticket description',
    },
    {
      title: 'New Feature 9',
      projectId: projects[1]._id,
      sprintId: sprints[3]._id,
      creatorId: users[0]._id,
      description: 'This is a ticket description',
    },
    {
      title: 'New Feature 10',
      projectId: projects[1]._id,
      sprintId: sprints[4]._id,
      creatorId: users[0]._id,
      description: 'This is a ticket description',
    },
    {
      title: 'New Feature 11',
      projectId: projects[1]._id,
      // sprintId: sprints[0]._id,
      creatorId: users[0]._id,
      description: 'This is a ticket description',
    },
    {
      title: 'New Feature 12',
      projectId: projects[1]._id,
      // sprintId: sprints[0]._id,
      creatorId: users[0]._id,
      description: 'This is a ticket description',
    },
    {
      title: 'New Feature 13',
      projectId: projects[1]._id,
      // sprintId: sprints[0]._id,
      creatorId: users[0]._id,
      description: 'This is a ticket description',
    },
    {
      title: 'New Feature 14',
      projectId: projects[2]._id,
      // sprintId: sprints[0]._id,
      creatorId: users[1]._id,
      description: 'This is a ticket description',
    },
    {
      title: 'New Feature 15',
      projectId: projects[2]._id,
      // sprintId: sprints[0]._id,
      creatorId: users[1]._id,
      description: 'This is a ticket description',
    },
    {
      title: 'New Feature 16',
      projectId: projects[2]._id,
      // sprintId: sprints[0]._id,
      creatorId: users[1]._id,
      description: 'This is a ticket description',
    },
    {
      title: 'New Feature 17',
      projectId: projects[2]._id,
      // sprintId: sprints[0]._id,
      creatorId: users[1]._id,
      description: 'This is a ticket description',
    },
    {
      title: 'New Feature 18',
      projectId: projects[2]._id,
      // sprintId: sprints[0]._id,
      creatorId: users[1]._id,
      description: 'This is a ticket description',
    },
    {
      title: 'New Feature 19',
      projectId: projects[2]._id,
      // sprintId: sprints[0]._id,
      creatorId: users[1]._id,
      description: 'This is a ticket description',
    },
  ]).catch((err) => console.log(err))
  console.log('tickets', tickets)
}

module.exports = initDBDefaults
