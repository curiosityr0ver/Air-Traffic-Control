const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AirlineSchema = new Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    logo: { type: String }
});

const Airline = mongoose.model('Airline', AirlineSchema);

module.exports = { Airline };