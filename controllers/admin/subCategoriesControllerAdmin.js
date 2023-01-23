const subCategory = require('../../models/SubCategory');
const category = require('../../models/Category')

const getAllSubCategoriesByCategoryIdController = async (req, res) => {
	try {
		const allSubCategories = await subCategory.find()
			.where({categoryId: req.params.id})
			.sort({ order: 1});

		res.status(200).json({ allSubCategories });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
}

const getAllSubCategoriesController = async (req, res) => {
	try {
		const allSubCategories = await subCategory.aggregate(
			[
				{
					'$lookup': {
						from: category.collection.name, // collection to join
						localField: 'categoryId', // from subcategory field
						foreignField: '_id', // id from joined collection
						as: 'category_lookup', // named key in subcategories
					}
				},
				// For this data model, will always be 1 record in right-side
				// of join, so take 1st joined array element
				{
					'$set': {
						category_lookup: {'$first': '$category_lookup'},
					}
				},
			]
		)
			.sort({ order: 1})
			.exec();

		res.status(200).json({ allSubCategories });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const createSubCategoryController = async (req, res) => {
	try {
		const createSubCategory = await subCategory.create(req.body);
		res.status(201).json({ createSubCategory });
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

const deleteSubCategoryController = async (req, res) => {
	try {
		const { id: subCategoryID } = req.params;
		const getSingleSubCategory = await subCategory.findOneAndDelete({
			_id: subCategoryID,
		});

		if (!getSingleSubCategory) {
			return res
				.status(404)
				.json({ msg: `There is no subCategory with id: ${subCategoryID}` });
		}
		res.status(200).json({ getSingleSubCategory });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const updateSubCategoryController = async (req, res) => {
	try {
		const { id: subCategoryID } = req.params;
		const getSingleSubCategory = await subCategory.findOneAndUpdate(
			{ _id: subCategoryID },
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);

		if (!getSingleSubCategory) {
			return res
				.status(404)
				.json({ msg: `There is no subCategory with id: ${subCategoryID}` });
		}

		res.status(200).json({ getSingleSubCategory });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

module.exports = {
	getAllSubCategoriesByCategoryIdController,
	getAllSubCategoriesController,
	createSubCategoryController,
    getSingleSubCategoryController,
    deleteSubCategoryController,
    updateSubCategoryController
};
