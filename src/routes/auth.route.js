const express = require('express');
const {
	signup,
	signin,
	signout,
	getCurrentUser,
} = require('../controller/auth.controller');
const uploadImage = require('../middlewares/uploadImage');
const {
	signupValidator,
	signinValidator,
} = require('../utils/validators/auth.validator');
const currentUser = require('../middlewares/currentUser');
const router = express.Router();

router.post('/api/v1/auth/signup', [uploadImage, signupValidator], signup);

router.post('/api/v1/auth/signin', [signinValidator], signin);

router.post('/api/v1/auth/signout', signout);

router.get('/api/v1/auth/current-user', currentUser, getCurrentUser);


module.exports = router;
