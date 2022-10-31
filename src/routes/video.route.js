const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const router = express.Router();
const {
	createVideo,
	getVideo,
	getAllVideos,
	incrementViewCount,
	incrementShareCount,
	deleteVideo,
} = require('../controller/video.controller');
const {
	videoValidator,
	videoValidatorId,
} = require('../utils/validators/video.validator');
const uploadImage = require('../middlewares/uploadImage');

router.post(
	'/api/v1/video',
	[requireAuth, uploadImage, videoValidator],
	createVideo
);

router.patch('/api/v1/video/:id/view', [videoValidatorId], incrementViewCount);

router.patch(
	'/api/v1/video/:id/share',
	[videoValidatorId],
	incrementShareCount
);

router.get('/api/v1/video/:id', [requireAuth, videoValidatorId], getVideo);

router.get('/api/v1/videos', [requireAuth], getAllVideos);

router.delete(
	'/api/v1/video/:id',
	[requireAuth, videoValidatorId],
	deleteVideo
);

module.exports = router;
