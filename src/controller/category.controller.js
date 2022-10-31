const Category = require('../models/category.model');
const BadRequestError = require('../utils/errors/BadRequestError');

exports.createCategory = async (req, res) => {
	const category = await Category.create(req.body);
	res.status(201).send({ status: 201, category, success: true });
};

exports.deleteCategory = async (req, res) => {
	const category = await Category.findOneAndDelete(req.params.id);
	if (!category) {
		throw new BadRequestError('Category not exist');
	}
	res.status(204).send({});
};
