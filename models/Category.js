const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'ERROR: Name is required'],
        trim: true,
        maxlength: [50, '50 characters max']
    },
    slug: {
        type: String,
        required: [true, 'ERROR: Slug is required'],
        trim: true,
        maxlength: [50, '50 characters max']
    },
    order: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now(),
      },
});

module.exports = mongoose.model('Category', CategorySchema); 