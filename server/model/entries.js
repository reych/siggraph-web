const mongoose = require('mongoose');

const entriesSchema = new mongoose.Schema({
    title: String,
    content: String,
    type: String,
    id: Number
});

module.exports = mongoose.model('Entries', entriesSchema);
