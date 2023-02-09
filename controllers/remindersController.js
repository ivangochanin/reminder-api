const Reminder = require('../models/Reminder');

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

const getSingleReminderController = async (req, res) => {
	try {
		/* const getSingleReminder = await Reminder.findOne({ _id: req.params.id }); */
		// or in two lines:
		const { slug } = req.params;
		const getSingleReminder = await Reminder.findOne({ slug: slug });

		if (!getSingleReminder) {
			return res
				.status(404)
				.json({ msg: `There is no reminder with slug: ${slug}` });
		}
		res.status(200).json({ getSingleReminder });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

module.exports = {
	getAllRemindersBySubCategoryIdController,
	getAllRemindersController,
	getSingleReminderController,
};
