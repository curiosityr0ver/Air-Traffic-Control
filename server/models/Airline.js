const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AirlineSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5,
        maxlength: 20,
        match: [/^[a-zA-Z 0-9]+$/, 'name of airline must be alphanumeric']
    },
    country: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
        match: [/^[a-zA-Z]+$/, 'country of airline must be alphanumeric']
    },
    logo: {
        type: String,
        match: [/^https?:\/\/.+\.(jpg|jpeg|png)$/, 'logo must be a valid URL']
    }
});

const Airline = mongoose.model('Airline', AirlineSchema);

module.exports = { Airline };