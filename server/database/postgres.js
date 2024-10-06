const { Client } = require('pg');

const client = new Client
    ({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'password',
        port: 5432,
    });


client.connect();

client.query(
    'SELECT * FROM AIRPORTS',
    (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(res.rows);
        client.end();
    }
);

module.exports = client;