const express = require('express');
const fileUpload = require('express-fileupload');
const connectDB = require('./db/databaseConnect');
const cors = require('cors')
require('dotenv').config() // we do not need to store in variable
const remindersRoutes = require('./routes/remindersRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const subCategoriesRoutes = require('./routes/subCategoriesRoutes');
const remindersRoutesAdmin = require('./routes/admin/remindersRoutesAdmin');
const categoriesRoutesAdmin = require('./routes/admin/categoriesRoutesAdmin');
const subCategoriesRoutesAdmin = require('./routes/admin/subCategoriesRoutesAdmin');
const uploadImageRoutes = require('./routes/uploadImageRoutes');
const searchRoutes = require('./routes/searchRoutes')

const app = express();

// default options
app.use(fileUpload(undefined));

const allowCorsList = [process.env.ADMIN_URL, process.env.FRONTEND_URL]

const corsOptionsDelegate = function (req, callback) {
	let corsOptions;
	if (allowCorsList.indexOf(req.header('Origin')) !== -1) {
		corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false } // disable CORS for this request
	}
	callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(express.json()); // middleware - if we don't use this, we won't have data in req.body
app.use(cors(corsOptionsDelegate))
app.use(express.static('public'));

// Root route
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/subcategories', subCategoriesRoutes);
app.use('/api/v1/reminders', remindersRoutes);
app.use('/api/v1/upload', uploadImageRoutes);
app.use('/api/v1/search', searchRoutes);

// Admin routes
app.use('/api/v1/admin/categories', categoriesRoutesAdmin);
app.use('/api/v1/admin/subcategories', subCategoriesRoutesAdmin);
app.use('/api/v1/admin/reminders', remindersRoutesAdmin);

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
