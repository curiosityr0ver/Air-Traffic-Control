const express = require('express');

const { Airline } = require('../models/Airline');
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
            // Validate airport code length
            if (airport.length !== 3) {
                return res.status(400).json({ message: 'Airport code must be 3 characters long' });
            }

            // Find the airport document
            const airportDoc = await Airport.findOne({ code: airport.toUpperCase() });

            if (!airportDoc) {
                return res.status(404).json({ message: 'Airport not found' });
            }

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
                                        { 'departure.airport': airportDoc._id },
                                        { 'arrival.airport': airportDoc._id }
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