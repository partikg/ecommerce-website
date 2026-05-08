require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const razorpayRoute = require("./src/routes/razorpay");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (request, response) => {
    response.send('working');
})

app.use('/api/category', require('./src/routes/categoryRoutes'));
app.use('/api/sale', require('./src/routes/saleRoutes'));
app.use('/api/user', require('./src/routes/userRoutes'));
app.use('/api/order', require('./src/routes/orderRoutes'));

app.use('/uploads/categories', express.static('uploads/categories'))
app.use('/uploads/user', express.static('uploads/user'))
app.use('/uploads/sales', express.static('uploads/sales'))
app.use("/api/razorpay", razorpayRoute);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`);
});

module.exports = app;