const subCategory = require('../models/SubCategory');
const categoryModel = require('../models/Category')

const getAllSubCategoriesByCategorySlugController = async (req, res) => {
	try {
		const category = await categoryModel.where({slug: req.params.slug})
		const allSubCategories = await subCategory.find()
			.populate('category')
			.populate('reminders')
			.where({category: category[0]._id})
			.sort({ order: 1});

		res.status(200).json({ allSubCategories });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
}

const getAllSubCategoriesController = async (req, res) => {
	try {
		const allSubCategories = await subCategory.find().sort({ order: 1});
		res.status(200).json({ allSubCategories });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const getSingleSubCategoryController = async (req, res) => {
	try {
		/* const getSingleSubCategory = await subCategory.findOne({ _id: req.params.id }); */
		// or in two lines:
		const { id: subCategoryID } = req.params;
		const getSingleSubCategory = await subCategory.findOne({ _id: subCategoryID });

		if (!getSingleSubCategory) {
			return res
				.status(404)
				.json({ msg: `There is no category with id: ${subCategoryID}` });
		}
		res.status(200).json({ getSingleSubCategory });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

module.exports = {
	getAllSubCategoriesByCategorySlugController,
	getAllSubCategoriesController,
    getSingleSubCategoryController
};
