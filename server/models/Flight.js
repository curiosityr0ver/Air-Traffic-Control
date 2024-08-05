const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// FlightLeg Schema (for both Arrival and Departure)
const FlightLegSchema = new Schema({
    airport: { type: Schema.Types.ObjectId, ref: 'Airport', required: true },
    scheduledTime: { type: Date, required: true },
    actualTime: { type: Date },
    terminal: { type: String },
    gate: { type: String },
    runway: { type: String },
    status: { type: String, enum: ['Scheduled', 'Delayed', 'In Progress', 'Completed', 'Cancelled'], default: 'Scheduled' }
});

// Flight Schema
const FlightSchema = new Schema({
    flightNumber: { type: String, required: true, unique: true },
    airline: { type: Schema.Types.ObjectId, ref: 'Airline', required: true },
    departure: { type: FlightLegSchema, required: true },
    arrival: { type: FlightLegSchema, required: true },
    aircraft: { type: Schema.Types.ObjectId, ref: 'Aircraft', required: true },
    status: { type: String, enum: ['Scheduled', 'Delayed', 'In Air', 'Landed', 'Cancelled'], default: 'Scheduled' }
});

const Flight = mongoose.model('Flight', FlightSchema);
module.exports = { Flight };