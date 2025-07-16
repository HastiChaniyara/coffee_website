const express = require('express');
const router = express.Router();
const { register,getAllUsers,login ,deleteUser,updateUser} = require('../controllers/authController');

router.post('/register', register);


router.get('/users', getAllUsers);
router.post('/login', login);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);

module.exports = router;
