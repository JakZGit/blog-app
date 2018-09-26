var mongoose = require('mongoose');

var BlogSchema = new mongoose.Schema({
	title: String,
	author: String,
	text: String,
	published_date : {type: Date }
});

module.exports = mongoose.model('Blog', BlogSchema);