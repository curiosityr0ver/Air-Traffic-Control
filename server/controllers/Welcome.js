const express = require('express');

const router = express.Router();

// we'll tell about all the routes and what they do in the next sections, as well as features of the app
router.get('/', (req, res) => {
    const response = {
        message: 'Welcome to the Flight API',
        endpoints: {
            airlines: '/airline',
            flights: '/flight',
            aircrafts: '/aircraft',
            airports: '/airport',
            config: '/config'
        },
    };
    res.json(response);
});

module.exports = router;