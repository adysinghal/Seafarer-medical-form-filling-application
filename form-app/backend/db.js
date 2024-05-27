const mongoose = require('mongoose');
const mongoURI = "mongodb://0.0.0.0:27017/";

const connectToMongo = () => {
    mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));
}

module.exports = connectToMongo;