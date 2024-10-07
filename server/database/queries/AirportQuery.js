const AirportQuery = {
    getAirports: 'SELECT * FROM airports',
    getAirportById: 'SELECT * FROM airports WHERE id = $1',
    createAirport: 'INSERT INTO airports (name, city, country) VALUES ($1, $2, $3) RETURNING *',
    updateAirport: 'UPDATE airports SET name = $1, city = $2, country = $3 WHERE id = $4 RETURNING *',
    deleteAirport: 'DELETE FROM airports WHERE id = $1 RETURNING *'
};

module.exports = { AirportQuery };