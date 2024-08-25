const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    content: {
        type: String,
    },

    image: {
        type: String,
    },

    author: {
        type: String,
    },

    likes: {
        type: Number,
        
    },

    comments: {
        type: Array,
        default: []
    },

    created: {
        type: Date
    },

}, { versionKey: false });

module.exports = mongoose.model('Post', schema)