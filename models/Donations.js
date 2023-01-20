const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donationSchema = new Schema({
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
    payment: {
        type: [String],
        required: true
    },
    location: {
        type: String,
        enum: ['kachin', 'kayah', 'kayin', 'chin', 'mon', 'rakhine', 'shan', 'yangon', 'mandalay', 'ayeyarwady', 'bago', 'magway', 'sagaing', 'tanintharyi'],
        required: true
    },
    newPost: {
        type: Boolean
    }
})

module.exports = mongoose.model('Donation', donationSchema);