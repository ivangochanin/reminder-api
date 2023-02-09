const express = require('express');
const router = express.Router();

const {
    getAllSubCategoriesByCategorySlugController,
	getAllSubCategoriesController,
    getSingleSubCategoryController
} = require('../controllers/subCategoriesController');


// categories routes
router.route('/').get(getAllSubCategoriesController);
router.route('/:id').get(getSingleSubCategoryController);
router.route('/subcategories-by-category/:slug').get(getAllSubCategoriesByCategorySlugController)


module.exports = router;
