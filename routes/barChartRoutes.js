const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction'); // Assuming the Transaction model is defined

// API to get bar chart data for a selected month
router.get('/bar-chart', async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ message: 'Month is required' });
    }

    try {
        const priceRanges = [
            { range: '0-100', count: 0 },
            { range: '101-200', count: 0 },
            { range: '201-300', count: 0 },
            { range: '301-400', count: 0 },
            { range: '401-500', count: 0 },
            { range: '501-600', count: 0 },
            { range: '601-700', count: 0 },
            { range: '701-800', count: 0 },
            { range: '801-900', count: 0 },
            { range: '901-above', count: 0 }
        ];

        const transactions = await Transaction.find({
            dateOfSale: {
                $regex: `^${month}`,
                $options: 'i'
            }
        });

        transactions.forEach(transaction => {
            const price = transaction.price;
            if (price <= 100) priceRanges[0].count++;
            else if (price <= 200) priceRanges[1].count++;
            else if (price <= 300) priceRanges[2].count++;
            else if (price <= 400) priceRanges[3].count++;
            else if (price <= 500) priceRanges[4].count++;
            else if (price <= 600) priceRanges[5].count++;
            else if (price <= 700) priceRanges[6].count++;
            else if (price <= 800) priceRanges[7].count++;
            else if (price <= 900) priceRanges[8].count++;
            else priceRanges[9].count++;
        });

        res.status(200).json(priceRanges);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bar chart data', error });
    }
});

module.exports = router;
