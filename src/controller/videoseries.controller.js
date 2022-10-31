const VideoSeries = require('../models/video_series.model');
const NotFoundError = require('../utils/errors/NotFoundError');

exports.createVideoSeries = async (req, res) => {
	const videoSeries = new VideoSeries({
		...req.body,
	});

	await videoSeries.save();

	res.status(201).send({ status: 201, videoSeries, success: true });
};

exports.deleteVideoSeries = async (req, res) => {
	const videoSeries = await VideoSeries.findByIdAndDelete(req.params.id);
	if (!videoSeries) {
		throw new NotFoundError('videoSeries not found');
	}
	res.status(204).send();
};
