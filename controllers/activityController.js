const activityQuery = require('../models/Activity/Activity.query');

module.exports = {
    addActivity: (req, res, next) => {
        activityQuery.addActivity(req.body.name, req.body.startTime, req.body.endTime, req.body.category, req.user, next)
            .then(
                (activity) => res.status(201).send(activity)
            )
            .catch(next)
    },
    getAllActivity: (req, res, next) => {
        activityQuery.getActivityList(req, res, next)
            .then(
                (activitylist) => res.status(200).send(activitylist)
            )
            .catch(next)
    }
}