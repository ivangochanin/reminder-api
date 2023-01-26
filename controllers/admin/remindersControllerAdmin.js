const Reminder = require('../../models/Reminder');
const SubCategory = require('../../models/SubCategory');

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
		const allReminders = await Reminder.find().populate('subcategory');
		res.status(200).json({ allReminders });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const createReminderController = async (req, res) => {
	try {
		const createReminder = await Reminder.create(req.body);
		const {_id, subcategory} = createReminder

		// update subcategory with created reminder
		SubCategory.findByIdAndUpdate(subcategory,
			{
				$push: { reminders: [_id] }
			},
			(error, subCategory) => {
				if (error){
					return res.status(500).json({ msg: error });
				}
				return res.status(201).json({ createReminder, subCategory });
			}
		)
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const getSingleReminderController = async (req, res) => {
	try {
		/* const getSingleReminder = await Reminder.findOne({ _id: req.params.id }); */
		// or in two lines:
		const { id: reminderID } = req.params;
		const getSingleReminder = await Reminder.findOne({ _id: reminderID }).populate('subcategory');

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
	const { id: reminderID } = req.params;
	const getSingleReminder = await Reminder.findOne({ _id: reminderID });
	const {subcategory: subcategoryId} =  getSingleReminder
	
	try {
		const deleteSingleReminder = await Reminder.findOneAndDelete({
			_id: reminderID,
		});
   
		if (!deleteSingleReminder) {
			return res
				.status(404)
				.json({ msg: `There is no reminder with id: ${reminderID}` });
		}
		SubCategory.findByIdAndUpdate(subcategoryId,
			{
				$pullAll: { reminders: [reminderID] }
			},
			(error, subCategory) => {
				if (error){
					return res.status(500).json({ msg: error });
				}
				return res.status(201).json({ deleteSingleReminder, subCategory });
			}
		)
		
	} catch (error) {
		res.status(500).json({ msg: error });
	}  
};

const updateReminderController = async (req, res) => {
	try {
		const { id: reminderID } = req.params;
		const oldReminder = await Reminder.findById(req.body._id)
		
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

		if(!oldReminder.subcategory.equals(req.body.subcategory)) {
			 SubCategory.findByIdAndUpdate(oldReminder.subcategory,
				{
					$pullAll: { reminders: [oldReminder._id] }
				},
				(error, subCategory) => {
					if (error){
						return res.status(500).json({ msg: error });
					}
				}	
			)

			SubCategory.findByIdAndUpdate(req.body.subcategory,
				{
					$push: { reminders: [req.body._id] }
				},
				(error, subCategory) => {
					if (error){
						return res.status(500).json({ msg: error });
					}
				}
			)
		}

		return res.status(200).json({ getSingleReminder });
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
