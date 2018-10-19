const express = require('express');
const router = express.Router();
const Image = require('../models/images');
const User = require('../models/users');

// Image Index route
router.get('/', async (req, res) => {
	try {
		const foundImages = await Image.find({})
		res.render('images/index.ejs', {
			images: foundImages
		})
	} catch(err) {
		res.send(err)
	}
});

// Image New Route
router.get('/new', async (req, res) => {
	try {
		const allUsers = await User.find({})
		res.render('images/new.ejs', {
			users: allUsers
		})
	} catch(err) {
		res.send(err)
	}
});

// Image Show route
router.get('/:index', async (req, res) => {
	try {
		const foundImages = await Image.findById(req.params.index);
		const foundUser = await User.find({'img._id': req.params.index})
		res.render('images/show.ejs', {
			image: foundImages,
			user: foundUser
		})
	} catch(err) {
		res.send(err)
	}
});

// Image Edit route
router.get('/:index/edit', async (req, res) => {
	try {
		foundImage = await Image.findById(req.params.index);
		console.log(foundImage);
		allUsers = await User.find({});
		console.log(allUsers);
		foundUser = await User.findOne({'img._id': req.params.index})
		console.log(foundUser);
		res.render('images/edit.ejs', {
			image: foundImage,
			user: allUsers,
			usersImage: foundUser
		})
	} catch(err) {
		res.send(err)
	}
});

// Image Post route
router.post('/', async (req, res) => {
	try {
		const createdImage = await Image.create(req.body);
		const foundUser = await User.findById(req.body.authorId);
		console.log(foundUser);
		foundUser.img.push(createdImage)
		foundUser.save();
		res.redirect('/images')
	} catch(err) {
		res.send(err)
	}
});



// Image Delete route
router.delete('/:index', async (req, res) => {
	try {
		const deleteImage = await Image.findByIdAndDelete(req.params.index);
		const foundUser = await User.findOne({'img._id': req.params.index});
		foundUser.img.id(req.params.index).remove();
		foundUser.save((err, data) => {
			res.redirect('/images');
		})
	} catch(err) {
		res.send(err)
	}
});

// Image Put route
router.put('/:index', async (req, res) => {
	try {
		foundImage = await Image.findOneAndUpdate(req.params.id, req.body, {new: true});
		foundUser = await User.findOne({'img._id': req.params.index});
		if(foundUser._id.toString() !== req.body.userId.toString()){
			foundUser.img.index(req.params.index).remove();
			await foundUser.save();
			const newUser = await User.findById(req.body.userId);
			newUser.push(foundImage);
			await newUser.save();
			console.log(newUser);
			res.redirect('/images');
		} else {
			foundUser.img.id(req.params.index).remove();
			foundUser.img.push(foundImage);
			await foundUser.save();
			res.redirect('/images');
		}
	} catch(err) {
		res.send(err)
	}
});

module.exports = router