const User = require('../Models/User');
const { validationResult } = require('express-validator');

const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map(err => err.msg)});
    }

    const { email, password } = req.body;

    try {      
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'Cet e-mail existe déjà' });

        user = new User({ email, password });
        await user.save();

        res.status(201).json({ message: 'Utilisateur enregistré' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: ['Erreur du serveur'] });
    }
};

module.exports = {
    registerUser
}