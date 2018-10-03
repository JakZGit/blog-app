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
		Blog.find({}).sort('-published_date').exec(function(err, result) {
 			if(err) return next(err);
 			res.json(result);
 		});
	} else {
		return res.status(403).send({success: false, msg: 'Unauthorized.'});
	}
});

/*GET user post(s). */
router.get('/user/:id?', passport.authenticate('jwt', {session: false}), function(req, res, next) {
	var token = getToken(req.headers);
	let query = {user: req.user._id};
	if(req.params.id) query['_id'] = req.params.id;
	if(token) {
		Blog.find(query, function(err, result) {
 			if(err) return next(err);
 			res.json(result);
 		});
	} else {
		return res.status(403).send({success: false, msg: 'Unauthorized.'});
	}
});

/* Save blog. */
router.post('/:id?', passport.authenticate('jwt', {session: false}), function(req, res, next) {
	var token = getToken(req.headers);
	if(token) {
		var data = {
			title: req.body.title,
			post: req.body.post
		};
		if(req.params.id) {
			Blog.findOneAndUpdate({_id: req.params.id}, data, {upsert:true}, function(err, doc){
			    if (err) return next(err);
			    return res.send("succesfully saved");
			});
		} else {
			data['author'] = req.user.name;
			data['user'] = req.user._id;
			Blog.create(data, function(err, post) {
				if(err) return next(err);
				res.json(post);
			});
		}
	} else {
		return res.status(403).send({success: false, msg: 'Unauthorized.'});
	}
});



module.exports = router;