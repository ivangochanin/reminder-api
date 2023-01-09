const getAllRemindersController = (req, res) => {
    res.send('get all reminders')
}

const createReminderController = (req, res) => {
    res.json(req.body)
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