const jwt = require('jsonwebtoken');
const User = require('../models/Utilisateur');

module.exports = async (req, res, next) => {
    try {
        // Récupérer le token dans l'entête
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: "Accès refusé, token manquant" });
        }

        // Vérifier et décoder le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Récupérer l'utilisateur correspondant
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        // Ajouter l'utilisateur au req pour l'utiliser dans les controllers
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token invalide ou expiré", erreur: err.message });
    }
};

