const mongoose = require('mongoose');

const VideoSeriesSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'video series name is required'],
		},
		videos: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Video',
			},
		],
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

VideoSeriesSchema.post('save', async (doc, next) => {
	await doc.populate('videos');
	next();
});

module.exports = mongoose.model('video_series', VideoSeriesSchema);
