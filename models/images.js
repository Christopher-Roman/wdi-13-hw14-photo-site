const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
	posted: String,
	img: {type: String, required: true},
	title: {type: String, required: true}

});

module.exports = mongoose.model('Image', imageSchema);