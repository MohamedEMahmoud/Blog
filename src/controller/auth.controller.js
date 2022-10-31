const User = require('../models/user.model');
const BadRequestError = require('../utils/errors/BadRequestError');
const jwt = require('jsonwebtoken');
const Password = require('../utils/Password');
const CloudinaryUpload = require('../utils/cloudinaryFile');

exports.signup = async (req, res) => {
	const user = new User({ ...req.body });

	const cloudinaryFile = new CloudinaryUpload(
		req.files,
		User.collection.modelName
	);

	user.thumbnail = await cloudinaryFile.upload();

	generateToken(req, { id: user.id, role: user.role });

	await user.save();

	res.status(201).send({ status: 201, user, success: true });
};

exports.signin = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		throw new BadRequestError('Invalid credentials');
	}
	const passwordMatch = await Password.compare(
		user.password,
		req.body.password
	);

	if (!passwordMatch) {
		throw new BadRequestError('Invalid credentials');
	}

	generateToken(req, { id: user.id, role: user.role });

	res.status(200).send({ status: 200, user, success: true });
};

const generateToken = (req, ...user) => {
	return (req.session.jwt = jwt.sign(...user, process.env.JWT_KEY));
};

exports.signout = (req, res) => {
	req.session.destroy(function (err) {
		if (err) {
			console.log(err);
		}
		res.status(204).send({});
	});
};

exports.getCurrentUser = (req, res) => {
	res
		.status(req.currentUser ? 200 : 400)
		.send({ currentUser: req.currentUser || null });
};
