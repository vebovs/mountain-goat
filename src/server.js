require('dotenv').config();
const express = require('express');
const app = express();
const mongodb = require('mongodb');
const cors = require('cors');

const router = express.Router();

router.get('/', async (req, res) => {
    const hikes = await loadHikes();
    res.send(await hikes.find({}).limit(1).toArray());
})

async function loadHikes(){
    const client = await mongodb.MongoClient.connect(
        process.env.MONGODB_CONNECTION_STRING, {
            useNewUrlParser: true
        }
    );
    return client.db('mountain-goat').collection('hikes');
}

app.use(express.json());
app.use(cors());
app.use(router)

app.listen(3000, () => console.log('Server started'));