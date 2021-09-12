const multer = require('multer');

// var maxSize = 1 * 1000 * 1000;
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/uploads');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + file.originalname);
	},
});

const filefilter = function (req, file, cb) {
	if (
		file.mimetype == 'image/png' ||
		file.mimetype == 'image/jpg' ||
		file.mimetype == 'image/jpeg'
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const imageupload = multer({
	storage: storage,
	fileFilter: filefilter,
	limits: { fileSize: 7340032 }, ///7MB
});

module.exports = imageupload;
