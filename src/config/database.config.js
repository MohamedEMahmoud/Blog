const mongoose = require('mongoose');

module.exports = async () => {
	const connection = await mongoose.connect(`${process.env.MONGODB_URI}`);
	if (!connection) {
		throw new Error("couldn't connect to MongoDB");
	}
	console.log('Connecting to MongoDB');
};
