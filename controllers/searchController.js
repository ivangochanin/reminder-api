const Reminder = require('../models/Reminder');

const searchController = async (req, res) => {
  try {
    const results = await Reminder.find({search: req.query.keyphrase})

    return res.json(results)
  } catch (error) {
    return res.status(500).json({msg: 'Error'})
  }
}

module.exports = {
  searchController
}
