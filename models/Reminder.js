const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
	subcategory: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'SubCategory',
		required: [true, 'ERROR: SubCategory is required'],
	},
	name: {
		type: String,
		required: [true, 'ERROR: Name is required'],
		trim: true,
		maxlength: [50, '50 characters max'],
	},
	slug: {
        type: String,
        required: [true, 'ERROR: Slug is required'],
        trim: true,
        unique: true,
        maxlength: [50, '50 characters max']
    },
    order: {
        type: Number,
        default: 1
    },
	content: {
		type: String,
		required: [true, 'ERROR: Content is required']
	},
	language: {
		type: String,
		trim: true,
		enum: ['html', 'css', 'javascript', 'jsx', 'json', 'graphql'],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('Reminder', ReminderSchema);
