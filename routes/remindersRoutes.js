const express = require('express');
const router = express.Router();
const {
	getAllRemindersController,
	createReminderController,
	getSingleReminderController,
	updateReminderController,
	deleteReminderController,
} = require('../controllers/remindersController');


// - '/' - match whatever we pass in app.js - app.use('/api/v1/reminders', remindersRoute);
/* router.route('/').get(getAllRemindersController);
router.route('/').get(getAllRemindersController).post(createReminderController);
router.route('/:id').get(getSingleReminderController);
router.route('/:id').get(getSingleReminderController).patch(updateReminderController);
router.route('/:id').get(getSingleReminderController).delete(deleteReminderController); */

// or chain all together
router.route('/').get(getAllRemindersController).post(createReminderController);
router.route('/:id').get(getSingleReminderController).patch(updateReminderController).delete(deleteReminderController);

module.exports = router;
