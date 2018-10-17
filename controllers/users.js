const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Image = require('../models/images');


router.get('/', (req, res) => {
	User.find({}, (err, foundUsers) => {
		res.render('users/index.ejs', {
			user: foundUsers
		});
	});
});



module.exports = router