const express = require('express');
const router = express.Router();

const {
    getAllSubCategoriesByCategorySlugController,
	getAllSubCategoriesController,
	createSubCategoryController,
    getSingleSubCategoryController,
    deleteSubCategoryController,
    updateSubCategoryController
} = require('../controllers/subCategoriesController');


// categories routes
router.route('/').get(getAllSubCategoriesController).post(createSubCategoryController);
router.route('/:id').get(getSingleSubCategoryController).patch(updateSubCategoryController).delete(deleteSubCategoryController);
router.route('/subcategories-by-category/:slug').get(getAllSubCategoriesByCategorySlugController)


module.exports = router;
