const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const router = express.Router();
const {
	createArticle,
	getArticle,
	getAllArticles,
	incrementReadsCount,
	incrementShareCount,
	deleteArticle,
} = require('../controller/article.controller');
const {
	articleValidator,
	articleValidatorId,
} = require('../utils/validators/article.validator');
const uploadImage = require('../middlewares/uploadImage');

router.post(
	'/api/v1/article',
	[requireAuth, uploadImage, articleValidator],
	createArticle
);

router.patch(
	'/api/v1/article/:id/read',
	[articleValidatorId],
	incrementReadsCount
);

router.patch(
	'/api/v1/article/:id/share',
	[articleValidatorId],
	incrementShareCount
);

router.get(
	'/api/v1/article/:id',
	[requireAuth, articleValidatorId],
	getArticle
);

router.get('/api/v1/articles', [requireAuth], getAllArticles);

router.delete(
	'/api/v1/article/:id',
	[requireAuth, articleValidatorId],
	deleteArticle
);

module.exports = router;
