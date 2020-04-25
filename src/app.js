require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

require('./config/passport')(passport);

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const HikeDao = require('./dao/HikeDao');
const hikedao = new HikeDao(process.env.HIKE_COLLECTION);

const UserDao = require('./dao/UserDao');
const userdao = new UserDao(process.env.USER_COLLECTION);

app.get('/', async (req, res) => {
    res.json('Welcome to the Mountain Goat API');
});

app.post('/hikes', async (req, res) => {
    try {
        const hikes = await hikedao.getHikes(req.body);
        res.status(200);
        res.json(hikes);
    } catch(error) {
        res.status(500);
        res.json('An error has occurred');
    }
    
});

app.post('/register', async (req, res) => {
    try {
        const success = await userdao.create_user(req.body.username, req.body.password);
        if(success) {
            res.status(200);
            res.json('success')
        } else {
            res.status(409);
            res.json('Username taken');
        }
    } catch(error) {
        res.status(500);
        res.json('An error occurred');
    }
});

app.post('/login', async (req, res, next) => {
    passport.authenticate('local')(req, res, next);
    res.json('Logged in');
});

app.get('/logout', (req, res) => {
    req.logout();
    res.json('Logged out');
});

app.listen(5000, () => console.log('Server started at port 5000'));
