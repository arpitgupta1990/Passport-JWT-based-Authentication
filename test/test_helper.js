const mongoose = require('mongoose');
const keys = require('../config/keys');
mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect(keys.mongoURI);
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.warn('warming', error)
        });

})
beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        mongoose.connection.collections.activities.drop(() => {
            done();
        });
    });
});