const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
    title: String,
    date: Number,
    time: String,
    location: String,
    content: String,
    imageURL: String,
    updateTime: Number,
    eventId: Number
});

module.exports = mongoose.model('Events', eventsSchema);
