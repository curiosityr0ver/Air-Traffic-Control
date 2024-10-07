const { Pool } = require('pg');
const { FlightQuery } = require('./queries/FlightQuery');
const { AirportQuery } = require('./queries/AirportQuery');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'air-traffic-control',
    port: 5432,
});


module.exports = {
    query: (text, params) => pool.query(text, params),
    FlightQuery,
    AirportQuery,
};