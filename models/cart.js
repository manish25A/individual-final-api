const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
	itemId: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			required: true,
		},
	],

	customerId: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Customer',
			required: true,
		},
	],
});

const Product = mongoose.model('Cart', cartSchema);

module.exports = Product;
