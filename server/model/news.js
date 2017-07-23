const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    title: String,
    date: String,
    content: String,
    imageURL: String,
    id: Number
});

module.exports = mongoose.model('News', postsSchema);
