const mongoose = require('mongoose');

const groupId = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    NSFW: {
        type: Boolean,
        required: false,
        default: false
    },
    coolDownTime: {
        type: String,
        required: false,
    }
})

const ID = mongoose.model('id', groupId);

module.exports = ID;