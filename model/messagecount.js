const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    number_id: {
        type: String,
        required: true,
    },
    message_count: {
        type: Number,
        required: true,
        default: 0
    }

})

const groupId = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: false,
    },
    group: {
        type: [messageSchema],
        required: true,
    },
    nextDate: {
        type: String,
        required: false,
    },
    coolDown: {
        type: String,
        required: false,
    },
    totalMessage: {
        type: Number,
        required: false,
    }

})

const messageCount = mongoose.model('messagecount', groupId);

module.exports = messageCount;