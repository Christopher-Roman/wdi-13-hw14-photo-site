const express = require('express');
const router = express.Router();
const Image = require('../models/images');
const User = require('../models/users');

router.get('/', (req, res) => {
	Image.find({}, (err, foundImages) => {
		res.render('images/index.ejs', {
			images: foundImages
		});
	});
});


module.exports = router