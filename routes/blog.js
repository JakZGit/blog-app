var express = require('express');
var router = express.Router();
var Blog = require('../models/Blog.js');
var passport = require('passport');
require('../config/passport')(passport);

var getToken = function (headers) {
	//Authorization: <type> <credentials>
	if (headers && headers.authorization) {
		var parted = headers.authorization.split(' ');
		if (parted.length === 2) {
			return parted[1];
		} else {
			return null;
		}
	} else {
		return null;
	}
};

/* GET all blogs. */
router.get('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
	var token = getToken(req.headers);
	if(token) {
		Blog.find(function(err, result) {
 			if(err) return next(err);
 			res.json(result);
 		});
	} else {
		return res.status(403).send({success: false, msg: 'Unauthorized.'});
	}
});

/* Save blog. */
router.post('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
	var token = getToken(req.headers);
	if(token) {
		var data = {
			title: req.body.title,
			author: req.user.name,
			post: req.body.post,
			user: req.user._id
		}
		Blog.create(data, function(err, post) {
			if(err) return next(err);
			res.json(post);
		});
	} else {
		return res.status(403).send({success: false, msg: 'Unauthorized.'});
	}
});



module.exports = router;