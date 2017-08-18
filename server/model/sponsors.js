const mongoose = require('mongoose');

const sponsorsSchema = new mongoose.Schema({
    name: String,
    description: String,
    imagePath: String,
    link: String,
    id: Number
});

module.exports = mongoose.model('Sponsors', sponsorsSchema);
