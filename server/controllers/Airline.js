const express = require('express');

const { Airline } = require('../models/Airline');
const { Flight } = require('../models/Flight');
const { Airport } = require('../models/Airport');


const router = express.Router();

// Get all airlines
const getAirlines = async (req, res, next) => {
    try {
        const { name, country, airport } = req.query;
        let query = {};

        if (name) query.name = { $regex: name, $options: 'i' };
        if (country) query.country = { $regex: country, $options: 'i' };

        let airlines;

        if (airport) {
            // Use aggregation to find airlines with flights to/from the specified airport
            airlines = await Airline.aggregate([
                {
                    $lookup: {
                        from: 'flights',
                        let: { airlineId: '$_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ['$airline', '$$airlineId'] },
                                    $or: [
                                        { 'departure.airport': airport },
                                        { 'arrival.airport': airport }
                                    ]
                                }
                            }
                        ],
                        as: 'flights'
                    }
                },
                {
                    $match: {
                        ...query,
                        flights: { $not: { $size: 0 } }
                    }
                },
                {
                    $project: {
                        flights: 0 // Remove the flights array from the result
                    }
                }
            ]);
        } else {
            // If no airport specified, use the simple find query
            airlines = await Airline.find(query);
        }

        res.status(200).json(airlines);
    } catch (err) {
        next(err);
    }
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
        });
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