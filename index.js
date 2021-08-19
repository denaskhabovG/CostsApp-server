const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const costsRoutes = require('./routes/costs');
const Cost = require('./db/index');

const PORT = process.env.PORT || 3002;
const password = 'askhabov123';
const url = `mongodb+srv://deni:${password}@cluster0.ookrc.mongodb.net/myFirstDatabase`
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', costsRoutes);

async function start() {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => {
            console.log('Server has been started');
        });
    } catch (error) {
        console.log(error);
    }
}

start();
