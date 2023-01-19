const Category = require('../models/Category');

const getAllCategoriesController = async (req, res) => {
	try {
		const allCategories = await Category.find().sort({ order: 1});
		res.status(200).json({ allCategories });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const createCategoryController = async (req, res) => {
	try {
		const createCategory = await Category.create(req.body);
		res.status(201).json({ createCategory });
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

const deleteCategoryController = async (req, res) => {
	try {
		const { id: categoryID } = req.params;
		const getSingleCategory = await Category.findOneAndDelete({
			_id: categoryID,
		});

		if (!getSingleCategory) {
			return res
				.status(404)
				.json({ msg: `There is no Category with id: ${categoryID}` });
		}
		res.status(200).json({ getSingleCategory });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const updateCategoryController = async (req, res) => {
	try {
		const { id: categoryID } = req.params;
		const getSingleCategory = await Category.findOneAndUpdate(
			{ _id: categoryID },
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);

		if (!getSingleCategory) {
			return res
				.status(404)
				.json({ msg: `There is no Category with id: ${categoryID}` });
		}

		res.status(200).json({ getSingleCategory });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

module.exports = {
	getAllCategoriesController,
	createCategoryController,
    getSingleCategoryController,
    deleteCategoryController,
    updateCategoryController
};
