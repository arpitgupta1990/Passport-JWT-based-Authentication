const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

const keys = require('../../config/keys');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        trim: true
    },
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters'
          },
        required: [true, 'Name is required'],
        trim: true
    },
    password: {
        type: String,
        validate: {
            validator: (name) => name.length > 6,
            message: 'password must be longer than 6 characters'
          },
        required: [true, 'Password is required'],
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    jwtToken: { 
        type: String
    }
});
//hashing password
userSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      user.jwtToken = 'JWT ' + jwt.encode(user.id, keys.jwtSecret);
      next();
    })
  });

module.exports = mongoose.model('User', userSchema, 'users');