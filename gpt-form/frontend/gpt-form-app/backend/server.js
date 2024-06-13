const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth.js'));
const PORT = process.env.PORT || 5000

mongoose.connect('mongodb://0.0.0.0:27017').then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to Mongo', err);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
