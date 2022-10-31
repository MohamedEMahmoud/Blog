const Paper = require('../models/paper.model');
const CloudinaryFile = require('../utils/CloudinaryFile');
const NotFoundError = require('../utils/errors/NotFoundError');

exports.createPaper = async (req, res) => {
	const paper = new Paper({
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
		paper.collection.modelName
	);
	paper.square_cover = await cloudinaryFile.upload();
	paper.rectangle_cover = await cloudinaryFile.upload();

	await paper.save();
	res.status(201).send({ status: 201, paper, success: true });
};

exports.deletePaper = async (req, res) => {
	const paper = await Paper.findByIdAndDelete(req.params.id);

	if (!paper) {
		throw new NotFoundError('paper Not Found');
	}

	res.status(204).send({});
};

exports.getPaper = async (req, res) => {
	const paper = await Paper.findById(req.params.id);

	if (!paper) {
		throw new NotFoundError('paper Not Found');
	}

	res.status(200).send({ status: 200, paper, success: true });
};

exports.getAllPapers = async (req, res) => {
	const papers = await Paper.find({
		id: req.params.id,
		author: req.currentUser.id,
	});

	if (!papers.length) {
		throw new NotFoundError('papers Not Found');
	}

	res.status(200).send({ status: 200, papers, success: true });
};

exports.incrementReadCount = async (req, res) => {
	const paper = await Paper.findById(req.params.id);
	if (!paper) {
		throw new NotFoundError('paper Not Found');
	}
	
	paper.readsCount++;
	await paper.save();
	res.status(200).send({ status: 200, paper, success: true });
};

exports.incrementShareCount = async (req, res) => {
	const paper = await Paper.findById(req.params.id);
	if (!paper) {
		throw new NotFoundError('paper Not Found');
	}
	paper.shareCount++;
	await paper.save();
	res.status(200).send({ status: 200, paper, success: true });
};
