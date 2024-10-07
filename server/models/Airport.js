const joi = require('joi');

const AirportSchema = joi.object({
    code: joi.string().required().length(3),
    name: joi.string().required(),
    city: joi.string().required(),
    country: joi.string().required(),
    timezone: joi.string().required()
});

// Sample Airport Data
// {
//     "code": "LAX",
//     "name": "Los Angeles International Airport",
//     "city": "Los Angeles",
//     "country": "United States",
//     "timezone": "PST"
// }

module.exports = AirportSchema;

