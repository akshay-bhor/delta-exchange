const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');
const authController = require('../controllers/auth');

router.post('/login', isAuth, authController.login);
router.post('/register', isAuth, authController.register)

module.exports = router;