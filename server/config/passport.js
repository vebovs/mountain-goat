require('dotenv').config();
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const UserDao = require('../dao/UserDao');
const userdao = new UserDao(process.env.USER_COLLECTION);

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      userdao.find_user_by_username(username)
        .then(user => {
          if (!user) return done(null, false, { user: 'Wrong username' });
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false, { password: 'Wrong password' });
            }
          });
        })
        .catch(error => console.error(error));
    })
  );
  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });
  passport.deserializeUser((id, cb) => {
    userdao.find_user_by_id(id)
      .then(user => cb(null, user))
      .catch(error => cb(error, null))
  });
};