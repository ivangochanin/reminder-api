const Reminder = require('../models/Reminder');
const SubCategory = require('../models/SubCategory');

const searchController = async (req, res) => {
  try {
    const results = await Reminder.find({search: req.query.keyphrase})

    if (results.length) {
      const reminders = await Promise.all(
        results.map(async item => {
          const subcategory = await SubCategory.findById(item.subcategory)
            .populate('category')

          return {...item, subcategory}
        })
      )
      return res.json(reminders)
    }
    return res.json([])
  } catch (error) {
    return res.status(500).json({msg: 'Error'})
  }
}

module.exports = {
  searchController
}
