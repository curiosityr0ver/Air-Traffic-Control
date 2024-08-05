const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AircraftSchema = new Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    capacity: { type: Number, required: true }
});

const Aircraft = mongoose.model('Aircraft', AircraftSchema);

module.exports = { Aircraft };