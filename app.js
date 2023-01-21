const express = require('express');
const app = express();
const remindersRoutes = require('./routes/remindersRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const subCategoriesRoutes = require('./routes/subCategoriesRoutes');
const connectDB = require('./db/databaseConnect');
const cors = require('cors')
require('dotenv').config() // we do not need to store in variable
// middleware - if we don't use this, we won't have data in raq.body

const allowCorsList = [process.env.ADMIN_URL, process.env.FRONTEND_URL]

/* const corsOptions = {
	origin: allowCorsList,
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  } */

 const corsOptionsDelegate = function (req, callback) {
	let corsOptions;
	if (allowCorsList.indexOf(req.header('Origin')) !== -1) {
	  corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
	} else {
	  corsOptions = { origin: false } // disable CORS for this request
	}
	callback(null, corsOptions) // callback expects two parameters: error and options
  }

app.use(cors(corsOptionsDelegate))

app.use(express.json());

// root route
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/admin/categories', categoriesRoutes);
app.use('/api/v1/subcategories', subCategoriesRoutes);
app.use('/api/v1/admin/subcategories', subCategoriesRoutes);
app.use('/api/v1/reminders', remindersRoutes);
app.use('/api/v1/admin/reminders', remindersRoutes);


const port = process.env.PORT || 10000;

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
