const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Airport Schema
const AirportSchema = new Schema({
    code: { type: String, required: true, unique: true, length: 3 },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    timezone: { type: String, required: true }
});

const Airport = mongoose.model('Airport', AirportSchema);

module.exports = { Airport };
