const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction'); // Assuming the Transaction model is defined
const fetch = require('node-fetch'); // Ensure to install node-fetch if not already installed

// API to get combined data from all APIs
router.get('/combined', async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ message: 'Month is required' });
    }

    try {
        // Fetch statistics
        const statisticsResponse = await fetch(`http://localhost:5000/api/statistics?month=${month}`);
        const statisticsData = await statisticsResponse.json();

        // Fetch bar chart data
        const barChartResponse = await fetch(`http://localhost:5000/api/bar-chart?month=${month}`);
        const barChartData = await barChartResponse.json();

        // Fetch pie chart data
        const pieChartResponse = await fetch(`http://localhost:5000/api/pie-chart?month=${month}`);
        const pieChartData = await pieChartResponse.json();

        // Combine all data
        const combinedData = {
            statistics: statisticsData,
            barChart: barChartData,
            pieChart: pieChartData
        };

        res.status(200).json(combinedData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching combined data', error });
    }
});

module.exports = router;
