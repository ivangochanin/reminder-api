const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
    subject: String,
    title: String,
    description: String,
    code: String
});

module.exports = mongoose.model('Reminder', ReminderSchema);