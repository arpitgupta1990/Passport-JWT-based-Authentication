const assert = require('assert');
const User = require('../models/User/User.model');

describe('User Testing', () => {
    it('saves a user', (done) => {
        const arpit = new User({
            name: 'arpit',
            password: 'arpitgupta',
            email: 'a@s'
        });
        arpit.save()
            .then((user) => {
                assert(!user.isNew);
                done();
            })
    });
    it('validation testing requires a user name', () => {
        const user = new User({ name: undefined });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name is required');
    });
    it('validation testing requires a user email', () => {
        const user = new User({ email: undefined });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.email;
        assert(message === 'Email is required');
    });
});