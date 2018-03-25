const mongoose = require('mongoose');
const { Schema } = mongoose;

const activitySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Activity is required'],
    },
    startTime: {
        type: Date,
        required: [true, 'Start Time is required'],
    },
    endTime: {
        type: Date,
    },
    category: { 
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Activity', activitySchema, 'activities');