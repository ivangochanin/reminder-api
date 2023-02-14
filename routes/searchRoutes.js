const express = require('express');
const router = express.Router();

const {
  searchController
} = require('../controllers/searchController');


// upload routes
router.route('/').get(searchController);

module.exports = router;
