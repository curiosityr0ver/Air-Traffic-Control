const AirportQuery = {
    getAirports: 'SELECT * FROM airports',
    getAirportById: 'SELECT * FROM airports WHERE id = $1',
    createAirport: 'INSERT INTO airports (code, name, city, country, timezone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    updateAirport: 'UPDATE airports SET name = $1, city = $2, country = $3 WHERE id = $4 RETURNING *',
    deleteAirport: 'DELETE FROM airports WHERE id = $1 RETURNING *'
};

module.exports = { AirportQuery };