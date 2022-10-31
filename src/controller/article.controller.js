const Article = require('../models/article.model');
const CloudinaryFile = require('../utils/CloudinaryFile');
const NotFoundError = require('../utils/errors/NotFoundError');

exports.createArticle = async (req, res) => {
	const article = new Article({
		...req.body,
		paragraphs: [
			{
				title: req.body['paragraphs.title'],
				text: req.body['paragraphs.text'],
			},
		],
		author: req.currentUser.id,
	});

	const cloudinaryFile = new CloudinaryFile(
		req.files,
		Article.collection.modelName
	);
	article.square_cover = await cloudinaryFile.upload();
	article.rectangle_cover = await cloudinaryFile.upload();

	await article.save();

	res.status(201).send({ status: 201, article, success: true });
};

exports.deleteArticle = async (req, res) => {
	const article = await Article.findByIdAndDelete(req.params.id);

	if (!article) {
		throw new NotFoundError('Article Not Found');
	}

	res.status(204).send({});
};

exports.getArticle = async (req, res) => {
	const article = await Article.findById(req.params.id);

	if (!article) {
		throw new NotFoundError('Article Not Found');
	}

	res.status(200).send({ status: 200, article, success: true });
};

exports.getAllArticles = async (req, res) => {
	const articles = await Article.find({
		id: req.params.id,
		author: req.currentUser.id,
	});

	if (!articles.length) {
		throw new NotFoundError('Articles Not Found');
	}

	res.status(200).send({ status: 200, articles, success: true });
};

exports.incrementReadsCount = async (req, res) => {
	const article = await Article.findById(req.params.id);
	if (!article) {
		throw new NotFoundError('Article Not Found');
	}
	article.readsCount++;
	await article.save();
	res.status(200).send({ status: 200, article, success: true });
};

exports.incrementShareCount = async (req, res) => {
	const article = await Article.findById(req.params.id);
	if (!article) {
		throw new NotFoundError('Article Not Found');
	}
	article.shareCount++;
	await article.save();
	res.status(200).send({ status: 200, article, success: true });
};
