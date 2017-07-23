const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    whatWeDo: String,
    whoWeAre: String,
    contact: String
});

module.exports = mongoose.model('About', aboutSchema);
