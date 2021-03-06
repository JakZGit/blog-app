var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

//load user model
var User = require('../models/user');
var settings = require('./settings');

module.exports = function(passport) {
	var opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
	opts.secretOrKey = settings.secret;
	passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
		User.findOne({_id: jwt_payload._id}, function(err, user) {
			if(err) {
				return done(err, false);
			}
			if(user) {
				done(null, user);
			}
			else {
				done(null, false);
			}
		});
	}));
};
