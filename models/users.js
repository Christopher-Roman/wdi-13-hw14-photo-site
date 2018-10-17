const mongoose = require('mongoose');
const Images = require('./images');

const userSchema = new mongoose.Schema({
	name: {type: String, unique: true, required: true, dropDups: true},
	password: {type: String, required: true},
	img: String
});

module.exports = mongoose.model('User', userSchema);