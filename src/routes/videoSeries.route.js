const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const router = express.Router();
const {
	createVideoSeries,
	deleteVideoSeries
} = require('../controller/videoseries.controller');
const { videoSeriesValidator } = require('../utils/validators/videoseries.validator');

router.post(
	'/api/v1/videoseries',
	[requireAuth, videoSeriesValidator],
	createVideoSeries
);

router.delete('/api/v1/videoseries/:id', [requireAuth], deleteVideoSeries);

module.exports = router;
