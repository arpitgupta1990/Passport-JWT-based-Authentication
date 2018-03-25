const User = require("./User.model");
const bcrypt = require('bcrypt');

module.exports = {
    createUserByEmail: function (userProps, next) {
        return new Promise((resolve, reject) => {
            User.findOne({ email: userProps.email })
                .then(existingUser => {
                    if (!existingUser) {
                        userProps.createdOn = Date.now();
                        User.create(userProps)
                            .then(userNew => {
                                resolve(userNew);
                            })
                            .catch(next);
                    }
                    else {
                        reject({ message: 'user already exist' })
                    }
                })
                .catch(next);
        });
    },
    doLoginByEmail: function (userProps, next) {
        return new Promise((resolve, reject) => {
            User.findOne({ email: userProps.email })
                .then(user => {
                    if (user) {
                        bcrypt.compare(userProps.password, user.password, function (err, res) {
                            if (err) {
                                return next(err);
                            }
                            else if (res === true) {
                                resolve(user);
                            }
                            else {
                                reject({ message: 'Invalid Password' })
                            }
                        });
                    }
                    else {
                        reject({ message: 'No User Exists' })
                    }
                })
                .catch(next);
        })
    }
}