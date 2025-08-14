const mongoose=require('mongoose');

const tacheSchema = new mongoose.Schema({
  titre: { type: String, required: true }, // Titre de la tâche (obligatoire)
  description:{String}, // Description de la tâche
  priorite: { type: String, enum: ['basse', 'moyenne', 'haute'], default: 'moyenne' }, // Priorité
  statut: { type: String, enum: ['ouverte', 'enCours', 'terminee'], default: 'ouverte' }, // Statut
  assigneeA: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' }, // Personne assignée
  creePar: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' }, // Créateur de la tâche
  dateEcheance: {Date} // Date limite
}, { timestamps: true }); // Ajoute automatiquement createdAt et updatedAt

module.exports = mongoose.model('Tache', tacheSchema);