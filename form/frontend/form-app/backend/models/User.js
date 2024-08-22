const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        unique: true,
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema);
User.createIndexes();
module.exports = User;