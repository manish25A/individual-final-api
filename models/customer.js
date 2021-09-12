const crypto = require('crypto'); //to generate the token and hash it
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

SALT_WORK_FACTOR = 10;
(MAX_LOGIN_ATTEMPTS = 5), (LOCK_TIME = 2 * 60 * 60 * 1000);

const CustomerSchema = new mongoose.Schema(
	{
		fname: {
			type: String,
			required: [true, 'Enter first name'],
			trim: true,
			minlength: 3,
		},
		lname: {
			type: String,
			required: [true, 'Enter last name'],
			trim: true,
			minlength: 1,
		},
		number: {
			type: String,
			required: [true, 'Enter correct Phone number'],
		},
		email: {
			type: String,
			unique: true,
			trim: true,
			required: [true, 'Enter email'],
			lowercase: true,
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
			minlength: 6,
			select: false,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

CustomerSchema.virtual('isLocked').get(function () {
	// check for a future lockUntil timestamp
	return !!(this.lockUntil && this.lockUntil > Date.now());
});

CustomerSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};
CustomerSchema.methods.getId = function (data) {
	return this._id;
};
module.exports = mongoose.model('Customer', CustomerSchema);
