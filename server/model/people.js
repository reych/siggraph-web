const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
    name: String,
    year: String,
    major: String,
    position: String,
    quote: String,
    imageURL: String,
    id: Number
});

module.exports = mongoose.model('People', peopleSchema);
