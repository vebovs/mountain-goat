require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

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
        if(hikes) {
            res.status(200);
            res.json(hikes);
        } else {
            res.status(400);
            res.json('Nothing found');
        }
    } catch(error) {
        res.status(500);
        res.json('An internal server error has occurred');
    }
    
});

app.get('/hike/:id', async (req, res) => {
    try {
        const success = await hikedao.getHike(req.params.id);
        if(success) {
            res.status(200);
            res.json(success);
        } else {
            res.status(400);
            res.json('Nothing found');
        }
    } catch(error) {
        res.status(500);
        res.json('An internal server error has occurred');
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
        res.json('An internal server error occurred');
    }
});

app.post('/login', async (req, res, next) => {
    try {
        passport.authenticate('local', (err, user, info) => {
            if(err) { return next(err);}
            if(user) { 
                res.status(200);
                res.json(user);
            } else {
                res.status(401);
                res.json('Wrong username or password');
            }
        })(req, res, next);
    } catch(error) {
        res.status(500);
        res.json('An internal server error occurred');
    }
});

app.get('/logout', async (req, res) => {
    try {
        req.logout();
        res.status(200);
        res.json('Logout successful');
    } catch(error) {
        res.status(500);
        res.json('An internal server error occurred');
    }
});

app.post('/user/hikes', async (req, res) => {
    try {
        const success = await hikedao.findHikesByIds(req.body.data);
        if(success) {
            res.status(200)
            res.json(success);
        } else {
            res.status(404);
            res.json('Nothing found');
        }
    } catch(error) {
        res.status(500);
        res.json('An internal server error occurred');
    }
});

app.post('/user/hike/save', async (req, res) => {
    try {
        const success = await userdao.save_hike(req.body.user_id, req.body.hike_id, req.body.nickname);
        if(success) {
            res.status(200)
            res.json('success');
        } else {
            res.status(400);
            res.json('Hike already favourited');
        }
    } catch(error) {
        res.status(500);
        res.json('An internal server error occurred');
    }
});

app.delete('/user/hike/delete', async (req, res) => {
    try {
        const success = await userdao.delete_hike(req.body.user_id, req.body.hike_id);
        if(success) {
            res.status(200)
            res.json('success');
        } else {
            res.status(400);
            res.json('Nothing to delete');
        }
    } catch(error) {
        res.status(500);
        res.json('An internal server error occurred');
    }
});

if(process.env.NODE_ENV === 'production') {
    console.log('Production environment');
    app.use(express.static('./build'));
    app.get('*', (req, res) => {
        console.log(__dirname);
        console.log(path.resolve(__dirname, './build', 'index.html'));
        res.sendFile(path.resolve(__dirname, './build', 'index.html'));
    });
} else {
    console.log('Development environment');
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started at port ' + port));
