const Activity = require("./Activity.model");
const moment = require("moment");

module.exports = {
    addActivity: function (name, startTime, endTime, category, user, next) {
        return new Promise((resolve, reject) => {
            Activity.create({
                name: name,
                startTime: moment(Number(startTime)),
                endTime: moment(Number(endTime)),
                category: category,
                createdBy: user.id
            }).then(activity => {
                if (activity) {
                    resolve(activity);
                }
                else {
                    reject({ message: 'some error occured' })
                }
            }).catch(next);
        });
    },
    // getActivityList: function (next) {
    //     return new Promise((resolve, reject) => {
    //         Activity.find({})
    //             .populate('createdBy', 'name')
    //             .then(activity => {
    //                 if (activity) {
    //                     resolve(activity);
    //                 }
    //                 else {
    //                     reject({ message: 'some error occured' })
    //                 }
    //             }).catch(next);
    //     });
    // },
    getActivityList: function (next) {
        return new Promise((resolve, reject) => {
            let activityList = [];
            const stream = Activity.find({})
                .populate('createdBy', 'name')
                .cursor();
            stream.on('data', function (doc) {
                activityList.push(doc);
            });
            stream.once('end', function () {
                resolve(activityList);
            });
        }).catch(next);
    }
}