const express = require('express');
const router = express.Router();

const {
  uploadImageController
} = require('../controllers/uploadImageController');


// upload routes
router.route('/').post(uploadImageController);

module.exports = router;
