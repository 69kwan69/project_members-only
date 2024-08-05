import passport from 'passport';
import { Strategy } from 'passport-local';
import bcryptjs from 'bcryptjs';
import User from '../models/User.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        // req.session.messages = [];

        const foundUser = await User.findOne({ username });
        if (!foundUser)
          return done(
            null,
            false,
            req.flash('authentication', 'User not found.')
          );

        const matchedPassword = await bcryptjs.compare(
          password,
          foundUser.password
        );
        if (!matchedPassword)
          return done(
            null,
            false,
            req.flash('authentication', 'Password is incorrect.')
          );

        return done(null, foundUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
