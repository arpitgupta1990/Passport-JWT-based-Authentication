const assert = require('assert');
const Activity = require('../models/Activity/Activity.model');

describe('Activity Testing', () => {
    it('saves an activity', (done) => {
        const activity = new Activity({ 
            name: 'arpit',
            startTime: 1521831407219,
            endTime: 1521831420728,
            category: 'hard'
        });
        activity.save()
            .then((activity) => {
                assert(!activity.isNew);
                done();
            })
    });
    it('validation testing requires a activity name', () => {
        const activity = new Activity({ name: undefined });
        const validationResult = activity.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Activity is required');
    });
});