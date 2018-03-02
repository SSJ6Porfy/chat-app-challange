const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models');

const jwtAuth = passport => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = process.env.JWT_TOKEN || 'myreallybigsecret';
  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.findById(jwtPayload._id).then(user => {
      return done(null, user);
    }).catch(() => {
      return done(null, false);
    });
  }));
};

module.exports = jwtAuth;