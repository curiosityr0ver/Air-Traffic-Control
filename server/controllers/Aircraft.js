const express = require('express');
const { Aircraft } = require('../models/Aircraft');

const router = express.Router();


// Get all aircrafts
const getAircrafts = (req, res, next) => {
    Aircraft.find()
        .then(aircrafts => {
            res.json(aircrafts);
        })
        .catch(err => {
            next(err);
        }
        );
};

// Get a single aircraft
const getAircraftById = (req, res, next) => {
    Aircraft.findById(req.params.id)
        .then(aircraft => {
            if (!aircraft) return res.status(404).send('Aircraft not found');
            res.json(aircraft);
        })
        .catch(err => {
            next(err);
        }
        );
};

// Create an aircraft
const createAircraft = (req, res, next) => {
    const aircraftData = req.body;

    const aircraft = new Aircraft(aircraftData);
    aircraft.save()
        .then(() => {
            res.status(201).send(aircraft);
        })
        .catch(err => {
            err.status = 400;
            next(err);
        });
};

// Update an aircraft
const updateAircraft = (req, res, next) => {
    Aircraft.findByIdAndUpdate
        (req.params.id, req.body)
        .then(aircraft => {
            if (!aircraft) return res.status(404).send('Aircraft not found');
            res.json(aircraft);
        })
        .catch(err => {
            next(err);
        }
        );
};

// Delete an aircraft
const deleteAircraft = (req, res, next) => {
    Aircraft.findByIdAndDelete(req.params.id)
        .then(aircraft => {
            if (!aircraft) return res.status(404).send('Aircraft not found');
            res.json(aircraft);
        })
        .catch(err => {
            next(err);
        }
        );
};

router.get('/', getAircrafts);
router.get('/:id', getAircraftById);
router.post('/', createAircraft);
router.put('/:id', updateAircraft);
router.delete('/:id', deleteAircraft);

module.exports = router;