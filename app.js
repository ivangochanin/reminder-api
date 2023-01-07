const express = require('express');
const app = express();
const port = 3000;

// routes
app.get('/hello', (req, res) => {
    res.send('Reminder API')
})


// app.get('/api/v1/reminders') - get all reminders
// app.post('/api/v1/reminders') - create a new reminders
// app.get('/api/v1/reminders/:id') - get single reminder
// app.patch('/api/v1/reminders/:id') - update reminder
// app.delete('/api/v1/reminders/:id') - delete reminder


  app.listen(port, console.log(`Server i listening on port ${port}...`));
