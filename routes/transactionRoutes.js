const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction'); // Assuming the Transaction model is defined

// API to search transactions
router.get('/search', async (req, res) => {
    const { title, description, price } = req.query;
    const query = {};
    if (title) {
        query.title = { $regex: title, $options: 'i' };
    }
    if (description) {
        query.description = { $regex: description, $options: 'i' };
    }
    if (price) {
        query.price = price;
    }

    try {
        const transactions = await Transaction.find(query);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error });
    }
});

// API to list all transactions with pagination
router.get('/', async (req, res) => {
    const { page = 1, perPage = 10, search = '' } = req.query;
    const query = {
        $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { price: { $regex: search, $options: 'i' } }
        ]
    };

    try {
        const transactions = await Transaction.find(query)
            .limit(perPage * 1)
            .skip((page - 1) * perPage)
            .exec();

        const count = await Transaction.countDocuments(query);

        res.status(200).json({ transactions, totalPages: Math.ceil(count / perPage), currentPage: page });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error });
    }
});

module.exports = router;
