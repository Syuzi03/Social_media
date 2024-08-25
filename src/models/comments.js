const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    author: {
        type: String,
    },

    text: {
        type: String,
    },

    datetime: {
        type: String,
    },

}, { versionKey: false });

module.exports = mongoose.model('Comment', schema)