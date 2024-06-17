const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors');
const bodyParser = require('body-parser');
// require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth.js'));
const PORT = process.env.PORT || 5000

mongoose.connect("mongodb+srv://test:aditya@shipping-form.mfzagmp.mongodb.net/?retryWrites=true&w=majority&appName=Shipping-Form").then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to Mongo', err);
});

// connect to app

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
