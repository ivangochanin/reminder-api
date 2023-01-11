const Reminder = require('../models/Reminder')

const getAllRemindersController = (req, res) => {
    res.send('get all reminders')
}

const createReminderController = async (req, res) => {
    try {
        const createReminder = await Reminder.create(req.body)
        res.status(201).json({createReminder})
    } catch (error) {
        res.status(500).json({ msg: error})
    }
}

const getSingleReminderController = (req, res) => {
    res.json({id:req.params.id})
}

const updateReminderController = (req, res) => {
    res.send('update reminder')
}

const deleteReminderController = (req, res) => {
    res.send('delete reminder')
}

module.exports = { getAllRemindersController, createReminderController, getSingleReminderController, updateReminderController, deleteReminderController }