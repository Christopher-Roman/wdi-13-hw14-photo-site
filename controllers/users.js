const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Image = require('../models/images');


router.get('/', (req, res) => {
	User.find({}, (err, foundUsers) => {
		res.render('users/index.ejs', {
			users: foundUsers
		});
	});
});

router.get('/new', (req, res) => {
	res.render('users/new.ejs')
});



module.exports = router