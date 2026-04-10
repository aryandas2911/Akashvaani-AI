const express = require('express');
const router = express.Router();
const { 
  createApplication, 
  getApplicationsByUser, 
  updateApplicationStatus 
} = require('../controllers/applicationController');

router.post('/', createApplication);
router.get('/:user_id', getApplicationsByUser);
router.patch('/:id', updateApplicationStatus);

module.exports = router;
