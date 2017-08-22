const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    imagePath: String,
    link: String,
    updateTime: Number,
    id: Number
});

module.exports = mongoose.model('News', postsSchema);
