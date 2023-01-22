const express = require('express');
const router = express.Router();

const {
    getAllSubCategoriesByCategoryIdController,
	getAllSubCategoriesController,
	createSubCategoryController,
    getSingleSubCategoryController,
    deleteSubCategoryController,
    updateSubCategoryController
} = require('../../controllers/admin/subCategoriesControllerAdmin');


// categories routes
router.route('/').get(getAllSubCategoriesController).post(createSubCategoryController);
router.route('/:id').get(getSingleSubCategoryController).patch(updateSubCategoryController).delete(deleteSubCategoryController);
router.route('/subcategories-by-category/:id').get(getAllSubCategoriesByCategoryIdController)


module.exports = router;
