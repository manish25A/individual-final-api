const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const VendorSchema = new mongoose.Schema({
	vendorName: {
		type: String,
		unique:[true, 'Email already exists'],
		required: [true, 'Enter restaurant name'],
	},
	vendorEmail: {
		type: String,
		unique: true,
		trim: true,
		require: [true, 'Enter email'],
	},
	vendorPassword: {
		type: String,
		required: [true, 'Please add a password'],
		minlength: 6,
		select: false, // it will not return the password when quering
	},
	vendorAddress: {
		type: String,
		required: [true, 'Please add address'],
		trim: true,
	},
	photo: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: 'Vendor',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

VendorSchema.methods.getVendorSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

VendorSchema.methods.getId = function () {
	return this._id;
};

module.exports = mongoose.model('Vendor', VendorSchema);
