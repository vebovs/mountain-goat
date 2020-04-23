require('dotenv').config();
const express = require('express');
const app = express();

const HikeDao = require('./dao/HikeDao.js');
const hikedao = new HikeDao(process.env.HIKE_COLLECTION);

app.get('/', async (req, res) => {
    const data = await hikedao.getHike();
    res.json(data);
});

app.listen(3000, () => console.log('Server started at port 3000'));
