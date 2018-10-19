const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Image = require('../models/images');

// User Index Route
router.get('/', async (req, res) => {
	try {
		const foundUsers = await User.find({});
		res.render('users/index.ejs', {
			users: foundUsers
		})
	} catch(err) {
		res.send(err);
	}
});

// New User route
router.get('/new', (req, res) => {
	res.render('users/new.ejs')
});

// User Show route
router.get('/:index', async (req, res) => {
	try {
		const foundUser = await User.findById(req.params.index);
		const foundImage = await Image.find({user: foundUser.name})
		res.render('users/show.ejs', {
			user: foundUser,
			image: foundImage
			});
	} catch(err) {
		res.send(err)
	} 
});

// Edit Route
router.get('/:index/edit', async (req, res) => {
	try {
		const editUser = await User.findById(req.params.index);
		res.render('users/edit.ejs', {
			user: editUser
		})
	} catch(err) {
		res.send(err);
	}
})

// User Post route
router.post('/', async (req, res) => {
	try {
		const createdUser = await User.create(req.body);
		res.redirect('/users');
	} catch(err){
		res.send(err)
	}
})

// User Put route
router.put('/:index', async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(req.params.index, req.body);
		res.redirect('/users')
	} catch(err) {
		res.send(err);
	}
});


// User Delete route
router.delete('/:index', async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.index);
		const userImages = [];
		for(let i = 0; i < deletedUser.img.length; i++){
			userImages.push(deletedUser.img[i].id)
		}
		const deletedImages = await Image.deleteMany({
			_id: {
				$in: userImages
			}
		});
		res.redirect('/users')
	} catch(err) {
		res.send(err)
	}
});






module.exports = router