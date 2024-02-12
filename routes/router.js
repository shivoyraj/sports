const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/current-week-leaderboard', controller.getCurrentWeekLeaderboard);
router.get('/last-week-leaderboard/:country', controller.getLastWeekLeaderboard);
router.get('/user-rank/:userId', controller.getUserRank);

module.exports = router;