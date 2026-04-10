const express = require('express');
const router = express.Router();
const { createApplication } = require('../controllers/applicationController');

router.post('/', createApplication);

module.exports = router;
