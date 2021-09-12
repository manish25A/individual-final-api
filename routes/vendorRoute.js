const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {
	vendorLogin,
	getVendor,
	getVendors,
	vendorLogout,
	vendorUpdate,
} = require('../controllers/vendor');
const imageupload = require('../middleware/imageUpload');

const { vendorprotect } = require('../middleware/vendorauth');
const Vendor = require('../models/Vendor');

router.post('/register', imageupload.single('photo'), function (req, res) {
	const { vendorName, vendorEmail, vendorAddress } = req.body;
	const salt = bcrypt.genSaltSync(10);
	const photo = req.file.filename;

	bcrypt.hash(req.body.vendorPassword, salt, function (err, hashedPassword) {
		const vendorData = new Vendor({
			vendorName,
			vendorEmail,
			vendorAddress,
			vendorPassword: hashedPassword,
			photo: photo,
		});
		vendorData
			.save()
			.then(function () {
				res.status(201).json({ message: 'Successfully Registered' });
			})
			.catch(function (error) {
				res.status(500).json({ message: error });
			});
	});
});

router.route('/').get(getVendors);
router.route('/update').put(vendorprotect, vendorUpdate);
router.post('/login', vendorLogin);
router.get('/get',vendorprotect, getVendor);
router.get('/logout', vendorLogout);

module.exports = router;
