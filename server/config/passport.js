// Models
const passport = require("passport");
const User = require("../models/User");

var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      try {
        const user = await User.findById(jwt_payload.id);

        if (user) {
          // klo ada user, lanjut ke next middleware
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(err, false);
      }
    })
  );
};
