const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction'); // Assuming the Transaction model is defined

// API to initialize the database
router.get('/initialize', async (req, res) => {
    try {
        console.log('Fetching data from remote JSON file...');
        const response = await fetch('https://example.com/path/to/product_transaction.json'); // Updated URL

        const data = await response.json();

        // Clear existing data
        await Transaction.deleteMany({});

        // Insert new data
        const formattedData = data.map(item => ({
            title: item.title,
            description: item.description,
            price: item.price,
            dateOfSale: item.dateOfSale,
            category: item.category
        }));
        await Transaction.insertMany(formattedData);

        res.status(200).json({ message: 'Database initialized successfully', count: formattedData.length });

    } catch (error) {
        res.status(500).json({ message: 'Error initializing database', error });
    }
});

module.exports = router;
