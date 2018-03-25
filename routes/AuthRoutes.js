const express = require('express');
const router = express.Router();
const passport = require('passport');
const expressValidator = require('express-validator');
const userQuery = require('../models/User/User.query');

// register by email
router.post('/register', function (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('name', 'Name cannot be blank').notEmpty();
    req.assert('password', 'password cannot be blank').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).send({ errors: errors[0].msg });
    }
    userProps = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }
    userQuery.createUserByEmail(userProps, next)
        .then(
            user => res.status(201).send({ status: 'success', token: user.jwtToken })
        )
        .catch(next)
});

// login by email
router.post('/login', (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'password cannot be blank').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).send({ errors: errors[0].msg });
    }
    userProps = {
        email: req.body.email,
        password: req.body.password,
    }
    userQuery.doLoginByEmail(userProps, next)
        .then(
            user => res.status(200).send({ status: 'success', token: user.jwtToken })
        )
        .catch(next)
}
)

// login page UI
router.get('/', (req, res) => {
    res.status(200).send('login-signUp page');
})

module.exports = router;