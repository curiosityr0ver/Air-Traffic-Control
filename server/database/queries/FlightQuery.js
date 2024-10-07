const FlightQuery = {
    getFlights: 'SELECT * FROM flights',
    getFlightById: 'SELECT * FROM flights WHERE id = $1',
    createFlight: 'INSERT INTO flights (flight_number, departure_airport, arrival_airport, departure_time, arrival_time, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    updateFlight: 'UPDATE flights SET flight_number = $1, departure_airport = $2, arrival_airport = $3, departure_time = $4, arrival_time = $5, price = $6 WHERE id = $7 RETURNING *',
    deleteFlight: 'DELETE FROM flights WHERE id = $1 RETURNING *'
};

module.exports = { FlightQuery };