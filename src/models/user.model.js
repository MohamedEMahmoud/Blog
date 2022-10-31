const mongoose = require('mongoose');
const Password = require('../utils/Password');

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, 'Email field is required'],
		},
		password: {
			type: String,
			required: [true, 'password field is required'],
		},
		name: {
			type: String,
			required: [true, 'name field is required'],
		},
		role: {
			type: String,
			enum: ['Admin', 'Visitor', 'Author'],
		},
		thumbnail: String,
		facebook: String,
		twitter: String,
		articles: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Article',
			},
		],
		videos: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Video',
			},
		],
		papers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Paper',
			},
		],
	},
	{
		toJSON: {
			transform(_doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.password;
			},
		},
		versionKey: false,
		timestamps: true,
	}
);

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password', hashed);
	}
	next();
});
module.exports = mongoose.model('User', userSchema);
