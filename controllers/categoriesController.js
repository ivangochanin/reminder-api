const Category = require('../models/Category');

const getAllCategoriesController = async (req, res) => {
	try {
		const allCategories = await Category.find().sort({ order: 1}); // sort by order key
		res.status(200).json({ allCategories });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const getSingleCategoryController = async (req, res) => {
	try {
		/* const getSingleCategory = await Category.findOne({ _id: req.params.id }); */
		// or in two lines:
		const { id: categoryID } = req.params;
		const getSingleCategory = await Category.findOne({ _id: categoryID });

		if (!getSingleCategory) {
			return res
				.status(404)
				.json({ msg: `There is no category with id: ${categoryID}` });
		}
		res.status(200).json({ getSingleCategory });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

module.exports = {
	getAllCategoriesController,
    getSingleCategoryController
};
