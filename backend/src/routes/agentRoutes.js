const express = require('express');
const router = express.Router();
const { getReasoningTimeline } = require('../controllers/agentController');

router.get('/reasoning/:userId', getReasoningTimeline);

module.exports = router;
