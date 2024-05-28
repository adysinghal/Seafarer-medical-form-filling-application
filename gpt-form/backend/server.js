const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000

const formRoutes = require('./routes/forms');
app.use('/api/forms', formRoutes);

mongoose.connect('mongodb://0.0.0.0:27017').then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to Mongo', err);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
