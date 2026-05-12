require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const saleRoutes = require('./src/routes/saleRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const userRoutes = require('./src/routes/userRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const wishlistRoutes = require('./src/routes/wishlistRoutes');
const razorpayRoutes = require('./src/routes/razorpay');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (request, response) => {
    response.send('working');
})

app.use('/api/sales', saleRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlists', wishlistRoutes);
app.use('/api/razorpay', razorpayRoutes);

app.use('/uploads/categories', express.static('uploads/categories'))
app.use('/uploads/user', express.static('uploads/user'))
app.use('/uploads/sales', express.static('uploads/sales'))

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

module.exports = app;