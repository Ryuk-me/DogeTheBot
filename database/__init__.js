const mongoose = require('mongoose');
const Config = require('../Config');

mongoose.connect(Config.MONGO_DB_URI, {
        dbName: 'AuthGroup',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log('Monogodb connected');
    })
    .catch((err) => {
        console.log(err);
    });