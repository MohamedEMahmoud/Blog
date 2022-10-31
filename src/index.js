require('dotenv').config();
require('express-async-errors');

const dbConnection = require('./config/database.config');
const app = require('./app');

(async () => {
	dbConnection();

	const port = process.env.PORT || 3000;

	const server = app.listen(port, () =>
		console.log(`Listening on port ${port}`)
	);

	process.on('unhandledRejection', (err) => {
		console.log(err);
		console.log(`Unhandled rejection: ${err.name} | ${err.message}`);
		server.close(() => {
			console.log('application shut down');
			process.exit(1);
		});
	});
})();
