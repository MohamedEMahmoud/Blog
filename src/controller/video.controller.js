const Video = require('../models/video.model');
const CloudinaryFile = require('../utils/CloudinaryFile');
const NotFoundError = require('../utils/errors/NotFoundError');

exports.createVideo = async (req, res) => {
	const video = new Video({
		...req.body,
		author: req.currentUser.id,
	});

	const cloudinaryFile = new CloudinaryFile(
		req.files,
		video.collection.modelName
	);
	video.square_cover = await cloudinaryFile.upload();
	video.rectangle_cover = await cloudinaryFile.upload();

	await video.save();

	res.status(201).send({ status: 201, video, success: true });
};

exports.deleteVideo = async (req, res) => {
	const video = await Video.findByIdAndDelete(req.params.id);

	if (!video) {
		throw new NotFoundError('video Not Found');
	}

	res.status(204).send({});
};

exports.getVideo = async (req, res) => {
	const video = await Video.findById(req.params.id);

	if (!video) {
		throw new NotFoundError('video Not Found');
	}

	res.status(200).send({ status: 200, video, success: true });
};

exports.getAllVideos = async (req, res) => {
	const videos = await Video.find({
		id: req.params.id,
		author: req.currentUser.id,
	});

	if (!videos.length) {
		throw new NotFoundError('videos Not Found');
	}

	res.status(200).send({ status: 200, videos, success: true });
};

exports.incrementViewCount = async (req, res) => {
	const video = await Video.findById(req.params.id);
	if (!video) {
		throw new NotFoundError('video Not Found');
	}
	video.viewCount++;
	await video.save();
	res.status(200).send({ status: 200, video, success: true });
};

exports.incrementShareCount = async (req, res) => {
	const video = await Video.findById(req.params.id);
	if (!video) {
		throw new NotFoundError('video Not Found');
	}
	video.shareCount++;
	await video.save();
	res.status(200).send({ status: 200, video, success: true });
};
