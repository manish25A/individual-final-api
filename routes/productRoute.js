const express = require('express');
const router = express.Router();

const {
	createProduct,
	getProducts,
	getProductById,
	deleteProduct,
	getVendorProducts,
	getAdminProducts,
	productUpdate,
} = require('../controllers/product');

const { protect } = require('../middleware/auth');
const { vendorprotect } = require('../middleware/vendorauth');

router.route('/getProducts/:vendorName').get(getVendorProducts);

router.route('/').get(getProducts).post(vendorprotect, createProduct);

router.route('/:id').get(getProductById).delete(protect, deleteProduct);

router.route('/admin/getProducts').get(vendorprotect, getAdminProducts);

router.route('/update/:id').put(vendorprotect, productUpdate);

module.exports = router;
