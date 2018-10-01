var mongoose = require('mongoose');

var BlogSchema = new mongoose.Schema({
	title: String,
	author: String,
	post: String,
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	published_date : {type: Date }
});

module.exports = mongoose.model('Blog', BlogSchema);