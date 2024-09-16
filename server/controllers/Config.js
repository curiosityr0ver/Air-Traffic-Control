const express = require('express');

const { parseAndBulkInsert } = require('../utils/bulkUtils');
const { upload } = require('../middleware/upload');

const router = express.Router();

// Bulk insert data
router.post('/', upload.single('file'), async (req, res, next) => {
    const { source } = req.body;
    // json files are stored in /data folder

    let filepath;

    if (req.file) {
        console.log('file found!');
        filepath = req.file.path;
    } else {
        filepath = `./data/${source}.json`;
    }

    try {
        await parseAndBulkInsert(source, filepath);
        res.status(201).send('Data inserted successfully');
    } catch (err) {
        next(err);
    }
});

module.exports = router;
