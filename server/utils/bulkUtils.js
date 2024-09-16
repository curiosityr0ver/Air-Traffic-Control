const fs = require('fs');
const { Flight } = require('../models/Flight');
const { Airport } = require('../models/Airport');
const { Airline } = require('../models/Airline');
const { Aircraft } = require('../models/Aircraft');


const parseAndBulkInsert = async (source, filepath) => {
    try {
        const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));

        switch (source) {
            case 'flights':
                await Flight.insertMany(data);
                break;
            case 'airports':
                await Airport.insertMany(data);
                break;
            case 'airlines':
                await Airline.insertMany(data);
                break;
            case 'aircraft':
                await Aircraft.insertMany(data);
                break;
            default:
                throw new Error('Invalid source');
        }
    }
    catch (err) {
        throw err;
    }
};

module.exports = {
    parseAndBulkInsert
};