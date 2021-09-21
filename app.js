const express = require('express');
const morgan = require('morgan');
const connectDB = require('./bin/database');
const cookieParser = require('cookie-parser');
const path = require('path');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const createError = require('http-errors');
const helmet = require('helmet');

dotenv.config({
	path: './bin/config.env',
});

// Connect to mongoDB database
connectDB();
//static
const cartRoute = require('./routes/cartRoute');

// Load routes files
const customerRoute = require('./routes/customerRoute');
const productRoute = require('./routes/productRoute');
const vendorRoute = require('./routes/vendorRoute');
// initialize out app variable with express
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const { urlencoded } = require('express');

//logger
app.use(morgan('dev'));
var corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200,
};

//using cors for react
// app.use(cors());
app.use(express.json());
app.use(
	express.urlencoded({
		urlencoded: true,
		extended: false,
	})
);
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));

app.use('/customer/auth/', customerRoute);
app.use('/product', productRoute);
app.use('/vendor/auth/', vendorRoute);
app.use('/cart/', cartRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

module.exports = app;
