let { connect, Promise, connection } = require('mongoose');

const { URI } = require('../config')

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            family: 4,
            connectTimeoutMS: 10000
        };

        connect(URI, dbOptions);
        Promise = global.Promise;

        connection.on('connected', () => {
            console.log('Connected to MongoDB Successfully!');
        });

        connection.on('err', err => {
            console.error(`Error Occured From MongoDB: \n${err.message}`);
        });

        connection.on('disconnected', () => {
            console.warn('Connection Disconnected!');
        });
    }
};