//PROTECT THE MIDDLEWARE
const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse.js');
const Vendor = require('../models/Vendor');

//Protect routes
exports.vendorprotect = asyncHandler(async (req, res, next) => {
	let vendorToken;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		// Set token from Bearer token in header
		vendorToken = req.headers.authorization.split(' ')[1];
	}

	//Make sure token exist
	if (!vendorToken) {
		return next(
			new ErrorResponse(
				'Not authorized to access this route no token exists',
				401
			)
		);
	}

	try {
		//Verify token
		const decoded = jwt.verify(vendorToken, process.env.JWT_SECRET);
		// console.log(decoded);
		req.user = await Vendor.findById(decoded.id);
		next();
	} catch (err) {
		return next(
			new ErrorResponse(
				'Not authorized to access this route no token verify',
				401
			)
		);
	}
});
