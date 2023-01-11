const Reminder = require('../models/Reminder');

const getAllRemindersController = async (req, res) => {
	try {
		const allReminders = await Reminder.find({});
		res.status(200).json({ allReminders });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const createReminderController = async (req, res) => {
	try {
		const createReminder = await Reminder.create(req.body);
		res.status(201).json({ createReminder });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const getSingleReminderController = async (req, res) => {
    try {
		/* const getSingleReminder = await Reminder.findOne({ _id: req.params.id }); */
        // or in two lines: 
        const {id:reminderID} = req.params
		const getSingleReminder = await Reminder.findOne({ _id: reminderID });

        if(!getSingleReminder) {
            return res.status(404).json({msg: `There is no reminder with id: ${reminderID}`})
        }
		res.status(200).json({ getSingleReminder });
        
	} catch (error) {
		res.status(500).json({ msg: error });
	}
	
};

const updateReminderController = (req, res) => {
	res.send('update reminder');
};

const deleteReminderController = (req, res) => {
	res.send('delete reminder');
};

module.exports = {
	getAllRemindersController,
	createReminderController,
	getSingleReminderController,
	updateReminderController,
	deleteReminderController,
};
