const { Flight } = require('../models/Flight');

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