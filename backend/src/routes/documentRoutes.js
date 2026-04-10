const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadDocument } = require('../controllers/documentController');

// Multer memory storage holds the uploaded file as a buffer in memory
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), uploadDocument);

module.exports = router;
