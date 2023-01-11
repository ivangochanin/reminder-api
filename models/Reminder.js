const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'ERROR: Category is required'],
        trim: true,
        maxlength: [20, '20 characters max']
    },
    title: {
        type: String,
        required: [true, 'ERROR: Title is required'],
        trim: true,
        maxlength: [50, '50 characters max']
    },
    description: String,
    code: String
});

module.exports = mongoose.model('Reminder', ReminderSchema); 