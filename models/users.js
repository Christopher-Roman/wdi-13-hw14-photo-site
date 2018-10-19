const mongoose = require('mongoose');
const Images = require('./images');

const userSchema = new mongoose.Schema({
	name: String,
	password: {type: String, required: true},
	img: [Images.schema]
});

module.exports = mongoose.model('User', userSchema);