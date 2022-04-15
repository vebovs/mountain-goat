require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongodbstore = require('connect-mongodb-session')(session);

const store = new mongodbstore({
  uri: process.env.MONGODB_CONNECTION_STRING,
  databaseName: process.env.DATABASE,
});

store.on('error', () => {
  console.log(error);
});

app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: store,
  }),
);
app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

const HikeDao = require('./dao/HikeDao');
const hikedao = new HikeDao(process.env.HIKE_COLLECTION);

const UserDao = require('./dao/UserDao');
const userdao = new UserDao(process.env.USER_COLLECTION);

app.post('/hikes', async (req, res) => {
  try {
    const hikes = await hikedao.getHikes(req.body);
    if (hikes) {
      res.status(200);
      res.json(hikes);
    } else {
      res.status(400);
      res.json('Nothing found');
    }
  } catch (error) {
    res.status(500);
    res.json('An internal server error has occurred');
  }
});

app.get('/hike/:id', async (req, res) => {
  try {
    const success = await hikedao.getHike(req.params.id);
    if (success) {
      res.status(200);
      res.json(success);
    } else {
      res.status(400);
      res.json('Nothing found');
    }
  } catch (error) {
    res.status(500);
    res.json('An internal server error has occurred');
  }
});

app.post('/register', async (req, res) => {
  try {
    const success = await userdao.create_user(
      req.body.username,
      req.body.password,
    );
    if (success) {
      res.status(200).json('success');
    } else {
      res.status(409).json('Username taken');
    }
  } catch (error) {
    res.status(500).json('An internal server error occurred');
  }
});

app.post('/login', (req, res, next) => {
  try {
    passport.authenticate('local', (err, user, errorMessage) => {
      if (err) throw err;
      if (!user) {
        res.status(401).json(errorMessage);
      } else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.status(200).json(req.user);
        });
      }
    })(req, res, next);
  } catch (error) {
    res.status(500).json('Internal Server Error server');
  }
});

app.get('/logout', async (req, res) => {
  try {
    req.logOut();
    res.status(200).json('Logout successful');
  } catch (error) {
    res.status(500).json('An internal server error occurred');
  }
});

app.get('/user', (req, res) => {
  res.send(req.user);
});

app.post('/user/hikes', async (req, res) => {
  try {
    const success = await hikedao.findHikesByIds(req.body.data);
    if (success) {
      res.status(200);
      res.json(success);
    } else {
      res.status(404);
      res.json('Nothing found');
    }
  } catch (error) {
    res.status(500);
    res.json('An internal server error occurred');
  }
});

app.post('/user/hike/save', async (req, res) => {
  try {
    const success = await userdao.save_hike(
      req.body.user_id,
      req.body.hike_ids,
      req.body.nickname,
    );
    if (success) {
      res.status(200);
      res.json({
        status: 'success',
        id: success,
      });
    } else {
      res.status(400);
      res.json('Nickname already in use');
    }
  } catch (error) {
    res.status(500);
    res.json('An internal server error occurred');
  }
});

app.delete('/user/hike/delete', async (req, res) => {
  //res.status(500).json('An internal server error occurred');
  try {
    const success = await userdao.delete_hike(
      req.body.user_id,
      req.body.hike_id,
    );
    if (success.modifiedCount) {
      res.status(200).json('success');
    } else {
      res.status(404).json('Hike not found');
    }
  } catch (error) {
    res.status(500).json('An internal server error occurred');
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started at port ' + port));
