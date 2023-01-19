const express = require('express');
const router = express.Router();

const {
	getAllCategoriesController,
	createCategoryController,
    getSingleCategoryController,
    deleteCategoryController,
    updateCategoryController
} = require('../controllers/categoriesController');



// categories routes
router.route('/').get(getAllCategoriesController).post(createCategoryController);
router.route('/:id').get(getSingleCategoryController).patch(updateCategoryController).delete(deleteCategoryController);


module.exports = router;
