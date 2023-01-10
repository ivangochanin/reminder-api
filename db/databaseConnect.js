const mongoose = require('mongoose')

mongoose.set('strictQuery', false); // from terminal info

const connectDB = (url) => {
    return mongoose.connect(url)
    //returning a promise - use try-catch where you import this function
}

module.exports = connectDB