const mongoose = require('mongoose');

const costSchema = new mongoose.Schema({
    text: String,
    price: Number,
});

module.exports = Cost = mongoose.model('costs', costSchema);
