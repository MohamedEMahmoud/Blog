const Article = require('../models/article.model');
const Category = require('../models/category.model');
const User = require('../models/user.model');
const BadRequestError = require('../utils/errors/BadRequestError');
const Video = require('../models/video.model');
const Paper = require('../models/paper.model');

// get all Authors
exports.getAllAuthors = async (req, res) => {
	const authors = await User.find({ role: 'Author' });
	if (!authors.length) {
		throw new BadRequestError('No authors found');
	}
	res.status(200).send({ status: 200, authors, success: true });
};

// get articles from author
exports.getArticlesFromAuthor = async (req, res) => {
	const articles = await Article.find({ author: req.params.authorId });
	if (!articles.length) {
		throw new BadRequestError('No articles found');
	}

	res.status(200).send({ status: 200, articles, success: true });
};

// get articles from ?category=
exports.getArticlesFromCategory = async (req, res) => {
	const categories = await Category.find({ name: req.query.category });
	if (!categories.length) {
		throw new BadRequestError('No categories found');
	}
	res.status(200).send({
		status: 200,
		articles: categories.map((category) => category.article),
		success: true,
	});
};

// get articles from both author and category
exports.getArticlesFromBoth = async (req, res) => {
	const articles = await Article.find({
		author: req.params.authorId,
		categories: {
			$in: req.params.categoryId,
		},
	});

	if (!articles.length) {
		throw new BadRequestError('No articles found');
	}

	res.status(200).send({ status: 200, articles, success: true });
};

// get one article from all authors
exports.getOneArticleFromAuthors = async (req, res) => {
	const authors = await User.find({ role: 'Author' });

	const articles = await Promise.all(
		authors.map(async (author) => {
			return await Article.findOne({
				author: author.id,
			});
		})
	);

	if (!articles.length) {
		throw new BadRequestError('No articles found');
	}
	res.status(200).send({ status: 200, articles, success: true });
};

exports.getAllBasedOnModel = async (req, res) => {
	const { model } = req.query;
	const data =
		model === 'authors'
			? await User.find({ role: 'Author' })
			: model === 'articles'
				? await Article.find({})
				: model === 'papers'
					? await Paper.find({})
					: model === 'videos'
						? await Video.find({})
						: model === 'video_series'
							? await Video.find({})
							: null;
	if (!data) {
		throw new BadRequestError('invalid Model Name');
	}

	res.status(200).send({ status: 200, data, success: true });
};


exports.getCurrentArticleWithSuggestions = async (req, res) => {

	const { articleId } = req.params;

	const currentArticle = await Article.findById(articleId);

	if (!currentArticle) {
		throw new BadRequestError('Article not exist');
	}

	const suggestions = (await Promise.all([
		// articlesSameAuthorAndCategory  
		Article.find({
			author: currentArticle.author,
			categories: { $in: currentArticle.categories },
			_id: { $ne: currentArticle.id }
		}),
		// articlesSameCategory 
		Category.find({
			_id: { $in: currentArticle.categories },
			article: { $ne: currentArticle.id }
		})
			.select('article -video -paper'),
		// articlesSameAuthor 
		Article.find({
			author: currentArticle.author,
			_id: { $ne: currentArticle.id }
		}),

	])).flat();

	res.status(200).send({ status: 200, currentArticle, suggestions, success: true });
};

