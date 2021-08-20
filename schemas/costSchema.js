const mongoose = require('mongoose');

const costSchema = new mongoose.Schema({
    text: String,
    price: Number,
    date: { type: Date, default: Date.now },
});

module.exports = Cost = mongoose.model('costs', costSchema);
