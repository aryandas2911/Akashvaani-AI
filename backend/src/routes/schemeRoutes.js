const express = require('express');
const router = express.Router();
const { getSchemes, getSchemeById } = require('../controllers/schemeController');

router.get('/', getSchemes);
router.get('/:id', getSchemeById);

module.exports = router;
