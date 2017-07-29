const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    title: String,
    eventName: String,
    date: Number,
    caption: String,
    imageURL: String,
    id: Number
});

module.exports = mongoose.model('GalleryPosts', gallerySchema);
