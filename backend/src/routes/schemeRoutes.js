const express = require('express');
const router = express.Router();
const { getSchemes } = require('../controllers/schemeController');

router.get('/', getSchemes);

module.exports = router;
