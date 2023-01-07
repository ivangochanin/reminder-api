const express = require('express');
const app = express();
const remindersRoutes = require('./routes/remindersRoutes');

// middleware
// if we don't use this, we won't have data in raq.body
app.use(express.json());


// routes
app.get('/hello', (req, res) => {
	res.send('Reminder API');
});

// root route
app.use('/api/v1/reminders', remindersRoutes);

// app.get('/api/v1/reminders') - get all reminders
// app.post('/api/v1/reminders') - create a new reminders
// app.get('/api/v1/reminders/:id') - get single reminder
// app.patch('/api/v1/reminders/:id') - update reminder
// app.delete('/api/v1/reminders/:id') - delete reminder

const port = 3000;
app.listen(port, console.log(`Server i listening on port ${port}...`));
