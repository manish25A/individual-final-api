const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth');

const { createCart, getCart, deleteProduct } = require('../controllers/cart');
router.route('/:id').post(protect, createCart).delete(protect, deleteProduct);

router.route('/all').get(protect, getCart);

module.exports = router;
