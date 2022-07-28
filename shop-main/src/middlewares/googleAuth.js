const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.js')

passport.serializeUser((user, cb) => {
  	cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
  	cb(null, id)
})

passport.use(new GoogleStrategy({
    	clientID: process.env.GOOGLE_CLIENT_ID,
    	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    	callbackURL: `${process.env.HOST}/auth/google/callback`
  	},
  	function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // })
    // console.log(profile)
    return cb(null, profile)
  	}
))