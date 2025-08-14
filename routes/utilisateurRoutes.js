const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');
const auth = require('../middlewares/authMiddleware.js');

// Routes publiques
router.post('/register', utilisateurController.register); // inscription
router.post('/login', utilisateurController.login);       // connexion

// Routes protégées
router.get('/',  utilisateurController.getAll);           // liste tous les utilisateurs
router.get('/:id',  utilisateurController.getById);       // obtenir un utilisateur
router.put('/:id',  utilisateurController.update);        // mettre à jour un utilisateur
router.delete('/:id',  utilisateurController.remove);     // supprimer un utilisateur

module.exports = router;
