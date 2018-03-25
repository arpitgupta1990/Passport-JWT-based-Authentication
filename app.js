const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');

const keys = require('./config/keys');

// routes 
const accountRoutes = require('./routes/accountRoutes');
const authRoutes = require('./routes/AuthRoutes');

// get passport settings
require('./services/passport');

// create server
const app = express();

// mongo DB connect
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);
mongoose.connection
    .once('open', () => { console.log('mongo running') })
    .on('error', (error) => {
        console.warn('mongoDB error', error)
    });


//initialize passport
app.use(passport.initialize());

// express middleware configs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

// temporary middleware delete me
app.use((req, res, next) => {
    console.log(req.body)
    // console.log(req.headers)
    next();
})

// routes
app.use('/auth', authRoutes);
app.use('/account',passport.authenticate('jwt', { session: false }), accountRoutes);
app.get('/',(req, res, next) => {
    res.status(200).send('Home page')
})


// catch error and forward to handler
app.use(function (err, req, res, next) {
    if (err) {
        res.status(422).send({ error: err.message });
    } else {
        res.status(400).send('Page not found');
    }
});

//set port 
const port = process.env.PORT || 4000;
app.listen(port);
module.exports = app;