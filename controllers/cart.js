const ErrorResponse = require('../utils/errorResponse');
const Cart = require('../models/cart');
const asyncHandler = require('../middleware/async');
//To get the file name extension line .jpg,.png
const path = require('path');

//--------------------CREATE cart data------------------

exports.createCart = asyncHandler(async (req, res, next) => {
	const cart = await Cart.create({
		itemId: req.params.id,
		customerId: req.user._id,
	});

	if (!cart) {
		return next(new ErrorResponse('Error adding product'), 404);
	}

	res.status(201).json({
		success: true,
		data: cart,
	});
});
//-------------------Display all cart items

exports.getCart = asyncHandler(async (req, res, next) => {
	await Cart.find({ customerId: req.user._id })
		.populate('customerId')
		.populate('itemId')
		.then(function (cartItemDisplay) {
			res.status(201).json({
				success: true,
				data: cartItemDisplay,
				count: cartItemDisplay.length,
			});
		})
		.catch((err) => {
			res.status(500).json({ success: false, message: err });
		});
});

//delete cart product
exports.deleteProduct = asyncHandler(async (req, res, next) => {
	const itemId = req.params.id;
	await Cart.deleteOne({ _id: itemId })
		.then(function (deleteItem) {
			res.status(201).json({ success: true, data: 'deleted successfully' });
		})
		.catch(function (err) {
			res.status(200).json({ success: false, data: err });
		});
});
