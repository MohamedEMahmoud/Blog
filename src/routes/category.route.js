const {
	createCategory,
	deleteCategory,
} = require('../controller/category.controller');
const requireAuth = require('../middlewares/requireAuth');
const {
	categoryValidator,
	categoryValidatorId,
} = require('../utils/validators/category.validator');
const express = require('express');

const router = express.Router();

router.post(
	'/api/v1/category',
	[requireAuth, categoryValidator],
	createCategory
);

router.delete(
	'/api/v1/category/:id',
	[requireAuth, categoryValidatorId],
	deleteCategory
);

module.exports = router;
