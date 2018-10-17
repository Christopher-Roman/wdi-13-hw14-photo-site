const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Image = require('../models/images');

// User Index Route
router.get('/', (req, res) => {
	User.find({}, (err, foundUsers) => {
		res.render('users/index.ejs', {
			users: foundUsers
		});
	});
});

// New User route
router.get('/new', (req, res) => {
	res.render('users/new.ejs')
});

// User Show route
router.get('/:index', (req, res) => {
	User.findById(req.params.index, (err, foundUser) => {
		res.render('users/show.ejs', {
			user: foundUser
		});
	});
});

// User Post route
router.post('/', (req, res) => {
	User.create(req.body, (err, createdUser) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/users')
		}
	})
})

// User Put route
router.put('/:index', (req, res) => {
	User.findByIdAndUpdate(req.params.index)
})


// User Delete route
router.delete('/:index', (req, res) => {
	User.findByIdAndDelete(req.params.index, (err, deletedUser) => {
		if(err){
			console.log(err);
		} else {
		res.redirect('/users')
		}
	})
})






module.exports = router