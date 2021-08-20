const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const costsRoutes = require('./routes/costs');
const appConfig = require('./config/appConfig');
const databaseConfig = require('./config/databaseConfig');

const app = express();

app.use(cors());
app.use('/costs', costsRoutes);
app.use(bodyParser.json());

async function start() {
    try {
        await mongoose.connect(databaseConfig.MONGO_URL, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        app.listen(appConfig.PORT, () => {
            console.log('Server has been started');
        });
    } catch (error) {
        console.log(error);
    }
}

start();
