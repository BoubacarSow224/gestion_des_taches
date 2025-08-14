const Tache = require('../models/taches');

//  Créer une tâche
exports.createTache = async (req, res) => {
    try {
        const { titre, description, priorite, statut, assigneeA, dateEcheance } = req.body;

        if (!titre) {
            return res.status(400).json({ message: "Le titre est obligatoire" });
        }

        const tache = new Tache({
            titre,
            description,
            priorite,
            statut,
            assigneeA,
            creePar: req.user ? req.user.id : null, // Si l'utilisateur est connecté
            dateEcheance
        });

        await tache.save();
        res.status(201).json({ message: "Tâche créée avec succès", tache });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
};

//  Récupérer toutes les tâches (avec filtrage)
exports.getAllTaches = async (req, res) => {
    try {
        const { priorite, statut } = req.query;

        let filtre = {};
        if (priorite) filtre.priorite = priorite;
        if (statut) filtre.statut = statut;

        const taches = await Tache.find(filtre)
            .populate("assigneeA", "nom email") // Afficher infos de l'assigné
            .populate("creePar", "nom email");  // Afficher infos du créateur

        res.json(taches);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
};

//  Récupérer une tâche par ID
exports.getTacheById = async (req, res) => {
    try {
        const tache = await Tache.findById(req.params.id)
            .populate("assigneeA", "nom email")
            .populate("creePar", "nom email");

        if (!tache) {
            return res.status(404).json({ message: "Tâche introuvable" });
        }

        res.json(tache);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
};

//  Mettre à jour une tâche
exports.updateTache = async (req, res) => {
    try {
        const { titre, description, priorite, statut, assigneeA, dateEcheance } = req.body;

        const tache = await Tache.findById(req.params.id);
        if (!tache) {
            return res.status(404).json({ message: "Tâche introuvable" });
        }

        if (titre) tache.titre = titre;
        if (description) tache.description = description;
        if (priorite) tache.priorite = priorite;
        if (statut) tache.statut = statut;
        if (assigneeA) tache.assigneeA = assigneeA;
        if (dateEcheance) tache.dateEcheance = dateEcheance;

        await tache.save();
        res.json({ message: "Tâche mise à jour avec succès", tache });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
};

//  Supprimer une tâche
exports.deleteTache = async (req, res) => {
    try {
        const tache = await Tache.findByIdAndDelete(req.params.id);
        if (!tache) {
            return res.status(404).json({ message: "Tâche introuvable" });
        }
        res.json({ message: "Tâche supprimée avec succès" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", erreur: err.message });
    }
};
