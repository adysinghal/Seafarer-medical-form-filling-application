const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
    name: String,
    type: String,
    required: Boolean
})

const formSchema = new mongoose.Schema({
    formName: String,
    fields: [fieldSchema]
});

module.exports = mongoose.model('Form', formSchema);