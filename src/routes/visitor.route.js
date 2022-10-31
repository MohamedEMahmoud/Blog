const express = require('express');
const router = express.Router();
const {
	getAllAuthors,
	getArticlesFromAuthor,
	getArticlesFromCategory,
	getArticlesFromBoth,
	getOneArticleFromAuthors,
	getAllBasedOnModel
} = require('../controller/visitor.controller');

const {
	visitorValidatorAuthorId,
	visitorValidatorCategory,
	visitorValidatorBoth,
} = require('../utils/validators/visitor.validator');

// get all Authors
router.get('/api/v1/visitor/authors', getAllAuthors);

// get articles from author
router.get(
	'/api/v1/visitor/articles/:authorId',
	[visitorValidatorAuthorId],
	getArticlesFromAuthor
);

// get articles from ?category=
router.get(
	'/api/v1/visitor/articles',
	[visitorValidatorCategory],
	getArticlesFromCategory
);

// get articles from both author and category
// authorId and categoryId in params
router.get(
	'/api/v1/visitor/articles/both/:authorId/:categoryId',
	[visitorValidatorBoth],
	getArticlesFromBoth
);

// get one article from all authors
router.get('/api/v1/visitor/article', getOneArticleFromAuthors);

// get all based on query 
router.get('/api/v1/visitor', getAllBasedOnModel);


module.exports = router;
