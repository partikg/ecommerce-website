const express = require('express');
const server = express();
const mongoose = require('mongoose');

const cors = require('cors');
server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/uploads/categories', express.static('uploads/categories'))
server.use('/uploads/user', express.static('uploads/user'))
server.use('/uploads/products', express.static('uploads/products'))
server.use('/uploads/sales', express.static('uploads/sales'))
server.use('/uploads/women', express.static('uploads/women'))

// delete this when working on frontend
server.get('/', async (request, response) => {
    response.send('working');
})

// backend
require('./src/routes/backend/categories.routes')(server);
require('./src/routes/backend/products.routes')(server);
require('./src/routes/backend/sales.routes')(server);
require('./src/routes/backend/women.routes')(server);
// frontend
require('./src/routes/frontend/user.routes')(server);
require('./src/routes/frontend/orders.routes')(server);

mongoose.connect('mongodb://127.0.0.1:27017/frankandco')
    .then(() => {
        server.listen('3');
        console.log('Connected!');
    })


// mongoose.connect('mongodb://127.0.0.1:27017/frankandco', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         server.listen('3');
//     })
//     .catch(err => console.error('Failed to connect to MongoDB:', err));