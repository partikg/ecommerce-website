require('dotenv').config();
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

server.get('/', async (request, response) => {
    response.send('working');
})

require('./src/routes/backend/categories.routes')(server);
require('./src/routes/backend/products.routes')(server);
require('./src/routes/backend/sales.routes')(server);
require('./src/routes/backend/women.routes')(server);
require('./src/routes/frontend/user.routes')(server);
require('./src/routes/frontend/orders.routes')(server);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));
