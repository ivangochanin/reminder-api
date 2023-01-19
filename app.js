const express = require('express');
const app = express();
const remindersRoutes = require('./routes/remindersRoutes');
const connectDB = require('./db/databaseConnect');
require('dotenv').config() // we do not need to store in variable

// middleware - if we don't use this, we won't have data in raq.body
app.use(express.json());

// root route
app.use('/api/v1/reminders', remindersRoutes);

const port = process.env.PORT || 3000;

const startBackend = async () => {
	try {
		//open the server only if the database connection is successful.
		await connectDB(process.env.MONGO_URL);
		console.log('CONNECTED TO THE DATABASE');
		app.listen(port, console.log(`Server i listening on port ${port}...`));
	} catch (error) {
		console.log(error);
	}
};

startBackend();
