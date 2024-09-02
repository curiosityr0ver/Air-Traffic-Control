const express = require('express');
const { Flight } = require('../models/Flight');

const router = express.Router();

// Get all flights
const getFlights = (req, res, next) => {
    Flight.find()
        .then(flights => {
            res.json(flights);
        })
        .catch(err => {
            next(err);
        }
        );
};

// Get a single flight
const getFlightById = (req, res, next) => {
    Flight.findById(req.params.id)
        .then(flight => {
            if (!flight) return res.status(404).send('Flight not found');
            res.json(flight);
        })
        .catch(err => {
            next(err);
        }
        );
};

// Create a flight
const createFlight = (req, res, next) => {
    const flightData = req.body;

    const flight = new Flight(flightData);
    flight.save()
        .then(() => {
            res.status(201).send(flight);
        })
        .catch(err => {
            err.status = 400;
            next(err);
        });
};

// Update a flight
const updateFlight = (req, res, next) => {
    Flight.findByIdAndUpdate
        (req.params.id, req.body)
        .then(flight => {
            if (!flight) return res.status(404).send('Flight not found');
            res.json(flight);
        })
        .catch(err => {
            next(err);
        }
        );
};

// Delete a flight
const deleteFlight = (req, res, next) => {
    Flight.findByIdAndDelete(req.params.id)
        .then(flight => {
            if (!flight) return res.status(404).send('Flight not found');
            res.json(flight);
        })
        .catch(err => {
            next(err);
        }
        );
};

router.get('/', getFlights);
router.get('/:id', getFlightById);
router.post('/', createFlight);
router.put('/:id', updateFlight);
router.delete('/:id', deleteFlight);

module.exports = router;