const express = require('express');
const { body } = require('express-validator');
const { registerUser, login } = require('../Controllers/AuthController');
const router = express.Router();

router.post('/register', [
    body('email')
    .isEmail().withMessage("Vous devez fournir un email"),
    body('password')
    .isLength({min: 6}).withMessage('Le mot de passe doit comporter au moins 6 caractéres')
], registerUser);

router.post('/login',[body('email').isEmail(), body('password').notEmpty()], login);

router.get('/session', (req, res) => {
    if (req.session.userId) {
        res.json({ isAuthenticated: true, email: req.session.email});
    } else {
        res.json({ isAuthenticated: false});
    }
})

module.exports = router;