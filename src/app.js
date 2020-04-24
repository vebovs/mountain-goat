require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const HikeDao = require('./dao/HikeDao.js');
const hikedao = new HikeDao(process.env.HIKE_COLLECTION);

app.get('/', async (req, res) => {
    res.json('Welcome to the Mountain Goat API');
});

app.post('/hikes', async (req, res) => {
    const data = await hikedao.getHikes(req.body);
    res.json(data);
});

app.listen(5000, () => console.log('Server started at port 5000'));
