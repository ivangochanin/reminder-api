const getAllRemindersController = (req, res) => {
    res.send('get all reminders')
}

const createReminderController = (req, res) => {
    res.send('create reminder')
}

const getSingleReminderController = (req, res) => {
    res.send('get single reminder')
}

const updateReminderController = (req, res) => {
    res.send('update reminder')
}

const deleteReminderController = (req, res) => {
    res.send('delete reminder')
}

module.exports = { getAllRemindersController, createReminderController, getSingleReminderController, updateReminderController, deleteReminderController }