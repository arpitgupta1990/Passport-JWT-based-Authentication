const assert = require('assert');
const User = require('../models/User/User.model');
const app = require('../app.js');
const request = require('supertest');

  describe('GET /', () => {
    it('should return http 200', (done) => {
      request(app)
        .get('/')
        .expect(200, done);
    });
  });