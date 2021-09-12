const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
	vendorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Vendor',
		required: true,
	},
	name: String,
	desc: String,
	price: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
