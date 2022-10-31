const mongoose = require('mongoose');
const User = require('./user.model');

const articleSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Article Name is required'],
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Article Author is required'],
		},
		square_cover: String,
		rectangle_cover: String,
		categories: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Category',
			},
		],
		paragraphs: [
			{
				title: String,
				text: String,
			},
		],
		readsCount: {
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
				ret.paragraphs = ret.paragraphs.map((data) => {
					const { title, text, _id: id } = data;
					return { title, text, id };
				});
			},
		},
		versionKey: false,
		timestamps: true,
	}
);

articleSchema.post('save', async function () {
	await User.updateOne(
		{ _id: this.author },
		{
			$push: {
				articles: this._id,
			},
		}
	);
});

module.exports = mongoose.model('Article', articleSchema);
