const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const hpp = require('hpp');
const helmet = require('helmet');
const compression = require('compression');
const session = require('express-session');
const NotFoundError = require('./utils/errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');
const authRouter = require('./routes/auth.route');
const currentUser = require('./middlewares/currentUser');
const categoryRouter = require('./routes/category.route');
const articleRouter = require('./routes/article.route');
const videoRouter = require('./routes/video.route');
const paperRouter = require('./routes/paper.route');
const videoSeriesRouter = require('./routes/videoSeries.route');
const visitorRouter = require('./routes/visitor.route');

let whitelist = ['https://web.postman.co'];
let corsOptions = {
	methods: 'GET,PUT,PATCH,POST,DELETE',
	origin: whitelist,
};

let MongoDbStore = require('connect-mongodb-session')(session);
const store = new MongoDbStore({
	uri: process.env.MONGODB_URI,
	collection: 'sessions',
});

app.set('trust proxy', 1);

app.use([
	express.json({ extended: false }),
	cors(corsOptions),
	session({
		store: store,
		secret: process.env.JWT_KEY,
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false },
	}),
	morgan('dev'),
	hpp(),
	helmet(),
	compression(),
	authRouter,
	currentUser,
	categoryRouter,
	articleRouter,
	videoRouter,
	paperRouter,
	videoSeriesRouter,
	visitorRouter,
]);

app.get('/', (_req, res) => {
	res.status(200).send({ apiVersion: '1.0.0', website: 'blog', success: true });
});

app.use(
	'*',
	async () => {
		throw new NotFoundError('Route Not Found!');
	},
	errorHandler
);

module.exports = app;
