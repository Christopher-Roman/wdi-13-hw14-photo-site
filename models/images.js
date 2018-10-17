const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
	img: {type: String, required: true},
	title: String,
	author: {type: String, required:true}
});

module.exports = mongoose.model('Image', imageSchema);