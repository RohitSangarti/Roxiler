const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://rohitsangarti121:<CbRjCZ4GlK17fChb>@cluster0.pmsuv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const transactionRoutes = require('./routes/transactionRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes'); // Add the new route for statistics
const initializeRoutes = require('./routes/initializeRoutes'); // Add the new route for initialization
const barChartRoutes = require('./routes/barChartRoutes'); // Add the new route for bar chart
const pieChartRoutes = require('./routes/pieChartRoutes'); // Add the new route for pie chart
const combinedRoutes = require('./routes/combinedRoutes'); // Add the new route for combined data

// Define routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/statistics', statisticsRoutes); // Use the new route for statistics
app.use('/api/bar-chart', barChartRoutes); // Use the new route for bar chart
app.use('/api/pie-chart', pieChartRoutes); // Use the new route for pie chart
app.use('/api/combined', combinedRoutes); // Use the new route for combined data
app.use('/api', initializeRoutes); // Use the new route for initialization
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
