const express = require('express');
const db = require('../database/pg');
const Airport = require('../models/Airport');

const router = express.Router();

// Get all airports
const getAirports = async (req, res, next) => {
    try {
        const airports = await db.query(db.AirportQuery.getAirports);
        res.json(airports.rows);

    } catch (err) {
        next(err);
    }
};

// Get a single airport
const getAirportById = async (req, res, next) => {
    try {
        const airport = await Airport.findById(req.params.id);
        if (!airport) return res.status(404).send('Airport not found');
        res.json(airport);
    } catch (err) {
        next(err);
    }
};

// Create an airport
const createAirport = async (req, res, next) => {
    const airportData = req.body;
    //validate using joi schema later
    try {
        console.log("Here at createAirport");
        const airport = await db.query(db.AirportQuery.createAirport, Object.values(airportData));
        res.status(201).json(airport.rows[0]);
    } catch (err) {
        next(err);
    }
};

// Update an airport
const updateAirport = async (req, res, next) => {
    try {
        const airport = await Airport.findByIdAndUpdate
            (req.params.id, req.body);
        if (!airport) return res.status(404).send('Airport not found');
        res.json(airport);
    }
    catch (err) {
        next(err);
    }
};

// Delete an airport
const deleteAirport = async (req, res, next) => {
    try {
        const airport = await Airport.findByIdAndDelete(req.params.id);
        if (!airport) return res.status(404).send('Airport not found');
        res.json(airport);
    } catch (err) {
        next(err);
    }
};

router.get('/', getAirports);
router.get('/:id', getAirportById);
router.post('/', createAirport);
router.put('/:id', updateAirport);
router.delete('/:id', deleteAirport);

module.exports = router;