const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyparser = require('body-parser');
const HikeDao = require('./dao/HikeDao.js');
require('dotenv').config();

const app = express();
const pool = mysql.createPool({
    connectionLimit: 2,
    host: process.env.MYSQL_SERVER_HOST,
    user: process.env.MYSQL_SERVER_USER,
    password: process.env.MYSQL_SERVER_PASSWORD,
    database: process.env.MYSQL_SERVER_DATABASE
});
const hikeDao = new HikeDao(pool);
const port = '8080';
const corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions));
app.use(bodyparser.json());

app.listen(port, () => {
    console.log('Started server on port ' + port);
});

app.post('/api', (req, res) => {
    hikeDao.getHikes(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});
