// Package imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// Local imports
const AirlineRouter = require('./controllers/Airline');
const FlightRouter = require('./controllers/Flight');
const AircraftRouter = require('./controllers/Aircraft');
const AirportRouter = require('./controllers/Airport');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI;
// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/flight', FlightRouter);
app.use('/airline', AirlineRouter);
app.use('/aircraft', AircraftRouter);
app.use('/airport', AirportRouter);


app.use('*', (req, res, next) => {
    const error = new Error('Resource not found');
    error.statusCode = 404;
    next(error);

});
app.use(errorHandler);


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});