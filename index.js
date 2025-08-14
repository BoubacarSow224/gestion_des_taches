require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/mybaseDB');
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const tacheRoutes = require('./routes/tacheRoutes');

const app = express();

// Middleware global
app.use(express.json());

// Connexion MongoDB
connectDB();
// Routes API
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/taches', tacheRoutes);

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Serveur démarré sur le port ${PORT}`));
