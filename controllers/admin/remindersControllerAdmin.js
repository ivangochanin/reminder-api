const Reminder = require('../../models/Reminder');

const getAllRemindersBySubCategoryIdController = async (req, res) => {
	try {
		const allReminders = await Reminder.find({})
			.where({subCategoryId: req.params.id});
			
		res.status(200).json({ allReminders });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
}

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
		const { id: reminderID } = req.params;
		const getSingleReminder = await Reminder.findOne({ _id: reminderID });

		if (!getSingleReminder) {
			return res
				.status(404)
				.json({ msg: `There is no reminder with id: ${reminderID}` });
		}
		res.status(200).json({ getSingleReminder });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const deleteReminderController = async (req, res) => {
	try {
		const { id: reminderID } = req.params;
		const getSingleReminder = await Reminder.findOneAndDelete({
			_id: reminderID,
		});

		if (!getSingleReminder) {
			return res
				.status(404)
				.json({ msg: `There is no reminder with id: ${reminderID}` });
		}
		res.status(200).json({ getSingleReminder });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const updateReminderController = async (req, res) => {
	try {
		const { id: reminderID } = req.params;
		const getSingleReminder = await Reminder.findOneAndUpdate(
			{ _id: reminderID },
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);

		if (!getSingleReminder) {
			return res
				.status(404)
				.json({ msg: `There is no reminder with id: ${reminderID}` });
		}

		res.status(200).json({ getSingleReminder });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

module.exports = {
	getAllRemindersBySubCategoryIdController,
	getAllRemindersController,
	createReminderController,
	getSingleReminderController,
	updateReminderController,
	deleteReminderController,
};