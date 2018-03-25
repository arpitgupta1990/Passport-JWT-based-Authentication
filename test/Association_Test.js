const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../models/User/User.model');
const Activity = require('../models/Activity/Activity.model');

describe('Assocation Testing', () => {
  let arpit, activity;

  beforeEach((done) => {
    arpit = new User({
        name: 'arpit',
        password: 'arpitgupta',
        email: 'a@s'
    });
    activity = new Activity({ 
        name: 'activity1',
        startTime: 1521831407219,
        endTime: 1521831420728,
        category: 'hard'
    });
    activity.createdBy = arpit;
    Promise.all([arpit.save(), activity.save()])
      .then(() => done());
  });

  it('saves a relation between a user and an activity', (done) => {
    Activity.findOne({ name: 'activity1' })
      .populate('createdBy')
      .then((act) => {
        assert(act.createdBy.id === arpit.id);
        done();
      });
  });
});