const express = require('express');
const { body } = require('express-validator');
const { registerUser } = require('../Controllers/AuthController');
const router = express.Router();

router.post('/register', [
    body('email')
    .isEmail().withMessage("Vous devez fournir un email"),
    body('password')
    .isLength({min: 6}).withMessage('Le mot de passe doit comporter au moins 6 caractéres')
], registerUser);

module.exports = router;