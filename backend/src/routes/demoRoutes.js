const express = require('express');
const router = express.Router();
const { runDemoCitizen } = require('../controllers/demoController');

router.get('/', runDemoCitizen);

module.exports = router;
