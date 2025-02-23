const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction'); // Assuming the Transaction model is defined

// API to get pie chart data for a selected month
router.get('/pie-chart', async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ message: 'Month is required' });
    }

    try {
        const categories = await Transaction.aggregate([
            {
                $match: {
                    dateOfSale: {
                        $regex: `^${month}`,
                        $options: 'i'
                    }
                }
            },
            {
                $group: {
                    _id: '$category', // Assuming 'category' is a field in the Transaction model
                    count: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pie chart data', error });
    }
});

module.exports = router;
