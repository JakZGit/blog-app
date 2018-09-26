var express = require('express');
var router = express.Router();
var Blog = require('../models/Blog.js');

/* GET all blogs. */
router.get('/', function(req, res, next) {
	Blog.find(function(err, result) {
 		if(err) return next(err);
 		res.json(result);
 	});
});

/* Save blog. */
router.post('/', function(req, res, next) {
	Blog.create(req.body, function(err, post) {
		if(err) return next(err);
		res.json(post);
	});
});

module.exports = router;