var mongoose = require('mongoose');
// var passport = require('passport');
// var settings = require('../config/settings');
// require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");


router.post('/register', function(req,res) {
	console.log("In here");
	if(!req.body.username || !req.body.password) {
		res.json({success: false, msg: 'Please pass username and password.'});
	} else {
		var newUser = newUser({
			username: req.body.username,
			password: req.body.password
		});
		newUser.save(function(err) {
			if(err) {
				return res.json({success: false, msg: 'Please pass username and password.'});
			}
			res.json({success: true, msg: 'Successful created new user.'});
		});
	}
});


router.post('/login', function(req,res) {
	User.findOne({ username: req.body.username }, function(err,user) {
		if(err) throw err;
		if(!user) {
			res.status(401).send({success:false, msg: 'Authentication failed. User does not exist.'});
		} else{
			 //validate password
			 user.comparePassword(req.body.password, function (err, isMatch) {
			 	if(!err && isMatch) {
			 		//user found an password correct
			 		//create token
			 		var token = jwt.sign(user.toJSON(), settings.secret);
			 		res.json({success: true, token: 'JWT' + token});
			 	} else {
			 		res.status(401).send({success: false, msg: 'Authentication failed. Wrong password'});
			 	}
			 });
		}
	});
});

module.exports = router;