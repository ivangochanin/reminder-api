const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
	subCategoryId: {
		type: String,
		required: [true, 'ERROR: SubCategory is required'],
	},
	title: {
		type: String,
		required: [true, 'ERROR: Title is required'],
		trim: true,
		maxlength: [50, '50 characters max'],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('Reminder', ReminderSchema);
