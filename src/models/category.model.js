const mongoose = require('mongoose');
const Article = require('./article.model');
const Video = require('./video.model');
const Paper = require('./paper.model');

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Category Name is required'],
		},
		video: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Video',
		},
		article: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Article',
		},
		paper: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Paper',
		},
	},
	{
		toJSON: {
			transform(_doc, ret) {
				ret.id = ret._id;
				delete ret._id;
			},
			versionKey: false,
			timestamps: true,
		},
	}
);

categorySchema.post('save', async function (doc, next) {
	await Article.updateOne(
		{ _id: this.article },
		{
			$push: {
				categories: this._id,
			},
		}
	);
	await Video.updateOne(
		{ _id: this.video },
		{
			$push: {
				categories: this._id,
			},
		}
	);
	await Paper.updateOne(
		{ _id: this.paper },
		{
			$push: {
				categories: this._id,
			},
		}
	);
	await doc.populate('article video paper');
	next();
});

categorySchema.pre(/^find/, function (next) {
	this.populate('article video paper');
	next();
});

module.exports = mongoose.model('Category', categorySchema);
