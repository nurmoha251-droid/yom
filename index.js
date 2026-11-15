const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();


app.use(express.json());


app.use('/api/books', require('./routes/books'));


app.get('/', (req, res) => {
    res.send('Welcome to Books API');
});


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log('MongoDB connection error:', error.message);
    });