const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: {
        type: String,
        min: 9,
        unique: true,
        required: true,
    },

    username: {
        type: String,
    },

    password: {
        type: String,
        required: true,
    },

    followers: {
        type: Array,
        default: []
    },

    followings: {
        type: Array,
        default: []
    },

    blocks: {
        default: [],
        type: Array
    },

    bio: {
        type: String
    },
}, { versionKey: false });

module.exports = mongoose.model('User', schema)
