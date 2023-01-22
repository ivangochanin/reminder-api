const express = require('express');
const router = express.Router();

const {
	getAllCategoriesController,
    getSingleCategoryController,
} = require('../controllers/categoriesController');

// categories routes
router.route('/').get(getAllCategoriesController);
router.route('/:id').get(getSingleCategoryController);


module.exports = router;
