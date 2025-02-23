const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction'); // Assuming the Transaction model is defined

// API to get statistics for a selected month
router.get('/statistics', async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ message: 'Month is required' });
    }

    try {
        const totalSales = await Transaction.aggregate([
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
                    _id: null,
                    totalAmount: { $sum: '$price' },
                    totalSoldItems: { $sum: { $cond: [{ $gt: ['$quantity', 0] }, 1, 0] } },
                    totalNotSoldItems: { $sum: { $cond: [{ $eq: ['$quantity', 0] }, 1, 0] } }
                }
            }
        ]);

        res.status(200).json(totalSales[0] || { totalAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching statistics', error });
    }
});

module.exports = router;
