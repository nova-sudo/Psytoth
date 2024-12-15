const express = require('express');
const { registerUser } = require('../controllers/authController'); // Import controller function
const router = express.Router();

router.post('/register', registerUser); // Call controller function

module.exports = router;
