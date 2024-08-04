const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const { Passenger } = require('./model/Passenger'); // Assuming models are in a separate file
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI;
// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));


// CRUD operations for Passenger
// Create
app.post('/passengers', async (req, res) => {
    try {
        const passengerData = req.body;
        const passenger = new PassengerScema(passengerData);
        await passenger.save();
        res.status(201).send(passenger);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Read (all passengers)
app.get('/passengers', async (req, res) => {
    try {
        const passengers = await Passenger.find();
        res.send(passengers);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Read (single passenger)
app.get('/passengers/:id', async (req, res) => {
    try {
        const passenger = await Passenger.findById(req.params.id);
        if (!passenger) return res.status(404).send('Passenger not found');
        res.send(passenger);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update
app.put('/passengers/:id', async (req, res) => {
    try {
        const passenger = await Passenger.findByIdAndUpdate(req.params.id, req.body);
        if (!passenger) return res.status(404).send('Passenger not found');
        res.send(passenger);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete
app.delete('/passengers/:id', async (req, res) => {
    try {
        const passenger = await Passenger.findByIdAndDelete(req.params.id);
        if (!passenger) return res.status(404).send('Passenger not found');
        res.send(passenger);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});