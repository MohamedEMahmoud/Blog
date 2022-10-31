const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const router = express.Router();
const {
	createPaper,
	getPaper,
	getAllPapers,
	incrementReadCount,
	incrementShareCount,
	deletePaper,
} = require('../controller/paper.controller');
const {
	paperValidator,
	paperValidatorId,
} = require('../utils/validators/paper.validator');
const uploadImage = require('../middlewares/uploadImage');

router.post(
	'/api/v1/paper',
	[requireAuth, uploadImage, paperValidator],
	createPaper
);

router.patch('/api/v1/paper/:id/read', [paperValidatorId], incrementReadCount);

router.patch(
	'/api/v1/paper/:id/share',
	[paperValidatorId],
	incrementShareCount
);

router.get('/api/v1/paper/:id', [requireAuth, paperValidatorId], getPaper);

router.get('/api/v1/papers', [requireAuth], getAllPapers);

router.delete(
	'/api/v1/paper/:id',
	[requireAuth, paperValidatorId],
	deletePaper
);

module.exports = router;
