const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Inscription
exports.register = async (req, res) => {
    try {
        const { nom, email, password, role } = req.body;

        // Vérifier si l'email existe déjà
        const existe = await User.findOne({ email });
        if (existe) {
            return res.status(400).json({ message: "Email déjà utilisé" });
        }

        // Créer un nouvel utilisateur
        const user = new User({ nom, email, password, role });
        await user.save();

        res.status(201).json({ message: "Utilisateur créé avec succès", user });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
};

// Connexion
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        // Comparer les mots de passe
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        // Générer un token JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: '1d' }
        );

        res.json({ message: "Connexion réussie", token });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
};

//  Obtenir tous les utilisateurs
exports.getAll = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // on cache le password
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
};

//  Obtenir un utilisateur par ID
exports.getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
};

//  Mettre à jour un utilisateur
exports.update = async (req, res) => {
    try {
        const { nom, email, password, role } = req.body;

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        if (nom) user.nom = nom;
        if (email) user.email = email;
        if (role) user.role = role;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.json({ message: "Utilisateur mis à jour avec succès", user });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
};

//  Supprimer un utilisateur
exports.remove = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }
        res.json({ message: "Utilisateur supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
};
