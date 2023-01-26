const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const campaignSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    url: {
        type: String,
        required: true
    },
    target: {
        type: String
    },
    prize: {
        type: String
    },
    forWhom: {
        type: String
    },
    payment: {
        type: [String],
        required: true
    },
    newPost: {
        type: Boolean
    }
})

module.exports = mongoose.model('Campaign', campaignSchema);