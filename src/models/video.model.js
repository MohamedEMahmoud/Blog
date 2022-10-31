const mongoose = require('mongoose');
const User = require('./user.model');

const videoSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'video name is required'],
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		square_cover: String,
		rectangle_cover: String,
		youtube_url: String,
		summary: String,
		categories: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Category',
			},
		],
		viewCount: {
			type: Number,
			default: 0,
		},
		shareCount: {
			type: Number,
			default: 0,
		},
	},
	{
		toJSON: {
			transform(_doc, ret) {
				ret.id = ret._id;
				delete ret._id;
			},
		},
		versionKey: false,
		timestamps: true,
	}
);

videoSchema.post('save', async function () {
	await User.updateOne(
		{ _id: this.author },
		{
			$push: {
				videos: this._id,
			},
		}
	);
});

module.exports = mongoose.model('Video', videoSchema);
