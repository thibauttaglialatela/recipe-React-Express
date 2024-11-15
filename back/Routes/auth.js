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
    console.log("Requête reçue sur /session");
    console.log("Données de session dans /session:", req.session.user);

    if (req.session.user && req.session.user.id) {
        res.json({ isAuthenticated: true, email: req.session.user.email });
    } else {
        res.json({ isAuthenticated: false });
    }
});

module.exports = router;