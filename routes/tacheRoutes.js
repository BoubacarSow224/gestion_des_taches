const express = require('express');
const router = express.Router();
const tacheController = require('../controllers/tacheController');
const auth = require('../middlewares/authMiddleware.js');

// Routes publiques (si besoin)
router.get('/', tacheController.getAllTaches);
router.get('/:id', tacheController.getTacheById);

// Routes protégées (nécessitent un token)
router.post('/ajouter', tacheController.createTache);
router.put('/:id', auth, tacheController.updateTache);
router.delete('/:id', auth, tacheController.deleteTache);

module.exports = router;
