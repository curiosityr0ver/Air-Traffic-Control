const express = require('express');

const { Airline } = require('../models/Airline');

const router = express.Router();

// Get all airlines
const getAirlines = (req, res, next) => {
    Airline.find()
        .then(airlines => {
            res.json(airlines);
        })
        .catch(err => {
            next(err);
        }
        );
};

// Get a single airline
const getAirlineById = (req, res, next) => {
    Airline.findById(req.params.id)
        .then(airline => {
            if (!airline) return res.status(404).send('Airline not found');
            res.json(airline);
        })
        .catch(err => {
            next(err);
        }
        );
};

// Create an airline
const createAirline = (req, res, next) => {
    const airlineData = req.body;
    const airline = new Airline(airlineData);
    airline.save()
        .then(() => {
            res.status(201).send(airline);
        })
        .catch(err => {
            err.status = 400;
            next(err);
        }
        );
};


// Update an airline
const updateAirline = (req, res, next) => {
    Airline.findByIdAndUpdate
        (req.params.id, req.body)
        .then(airline => {
            if (!airline) return res.status(404).send('Airline not found');
            res.json(airline);
        })
        .catch(err => {
            next(err);
        }
        );
};

// Delete an airline
const deleteAirline = (req, res, next) => {
    Airline.findByIdAndDelete(req.params.id)
        .then(airline => {
            if (!airline) return res.status(404).send('Airline not found');
            res.json(airline);
        })
        .catch(err => {
            next(err);
        }
        );
};

router.get('/', getAirlines);
router.get('/:id', getAirlineById);
router.post('/', createAirline);
router.put('/:id', updateAirline);
router.delete('/:id', deleteAirline);

module.exports = router;