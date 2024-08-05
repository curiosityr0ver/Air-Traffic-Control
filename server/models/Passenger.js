const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Passenger Schema
const PassengerSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    flight: { type: Schema.Types.ObjectId, ref: 'Flight', required: true },
    seatNumber: { type: String },
});

const Passenger = mongoose.model('Passenger', PassengerSchema);

module.exports = { Passenger };