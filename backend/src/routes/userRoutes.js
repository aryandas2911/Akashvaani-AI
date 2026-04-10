const express = require('express');
const router = express.Router();
const { createUser, getUserById, updateUser } = require('../controllers/userController');

router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);

module.exports = router;
