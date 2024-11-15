const User = require("../Models/User");
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((err) => err.msg) });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "Cet e-mail existe déjà" });

    user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: "Utilisateur enregistré" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: ["Erreur du serveur"] });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body; //on récupére l'email et le mot de passe fournit par l'utilisateur qui veut se connecter.

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Veuillez fournir un email et un mot de passe." });
  }

  try {
    //on cherche si l'utilisateur exite dans la base
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Identifiants incorrects");
    }
    //vérification du mot de passe
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      req.session.user = { id: user._id, email: user.email };
      req.session.save((err) => {
        if (err) {
          console.error("Erreur lors de la connexion: ", err);
          return res.status(500).json({ message: 'Erreur lors de la connexion'});
        }
        console.log("session aprés sauvegarde : ", req.session);
        console.log("connexion réussie", req.session.user.id);
        res.status(200).json({ message: "Connexion réussie" });
      });

      console.log("connexion réussie", req.session.user.id);
    } else {
      res.status(401).json({ message: "email ou mot de passe incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors la connexion" });
  }
};

module.exports = {
  registerUser,
  login,
};
