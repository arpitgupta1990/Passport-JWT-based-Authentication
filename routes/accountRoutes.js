const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

//activity
router.post("/activity", activityController.addActivity);
router.get("/activity", activityController.getAllActivity);




module.exports = router;