const mongoose = require('mongoose');
const atlasPlugin = require('mongoose-atlas-search');

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
		enum: ['html', 'css', 'javascript', 'typescript', 'json', 'graphql'],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

const ReminderModel = mongoose.model('Reminder', ReminderSchema);
 // Before everything we need to Create an Atlas Search Index:
 // https://www.mongodb.com/docs/atlas/atlas-search/create-index/
atlasPlugin.initialize({
	model: ReminderModel,
	overwriteFind: true,
	searchKey: 'search',
	searchFunction: query => {
		return {
			'wildcard': {
				'query': `${query}*`,
				'path': 'content',
				'allowAnalyzedField': true
			}
		}
	}
});

module.exports = ReminderModel
