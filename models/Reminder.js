const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
	subcategory: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'SubCategory',
		required: [true, 'ERROR: SubCategory is required'],
	},
	title: {
		type: String,
		required: [true, 'ERROR: Title is required'],
		trim: true,
		maxlength: [50, '50 characters max'],
	},
	content: {
		type: String,
		required: [true, 'ERROR: Content is required']
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('Reminder', ReminderSchema);
