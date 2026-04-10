const express = require('express');
const router = express.Router();
const { createUser, getUserById, updateUser, getUserByEmail } = require('../controllers/userController');

router.post('/', createUser);
router.get('/:id', getUserById);
router.get('/email/:email', getUserByEmail);
router.put('/:id', updateUser);

module.exports = router;
