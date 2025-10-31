import Event from '../models/Event.mjs';
import User from '../models/user.mjs';

//  Créer un événement
export const createEvent = async (req, res) => {
  try {
    const { name, description, startDate, endDate, location, coverPhoto, isPrivate, organizers } = req.body;

    // Vérifie que les organisateurs existent
    const foundOrganizers = await User.find({ _id: { $in: organizers } });
    if (foundOrganizers.length === 0) {
      return res.status(400).json({ message: "Aucun organisateur valide trouvé" });
    }

    const newEvent = await Event.create({
      name,
      description,
      startDate,
      endDate,
      location,
      coverPhoto,
      isPrivate,
      organizers
    });

    res.status(201).json({ message: "Événement créé avec succès", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'événement", error: error.message });
  }
};

//  Récupérer tous les événements
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizers', 'name email');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des événements", error: error.message });
  }
};

//  Récupérer un événement par ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizers participants', 'name email');
    if (!event) return res.status(404).json({ message: "Événement non trouvé" });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

//  Mettre à jour un événement
export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: "Événement non trouvé" });
    res.status(200).json({ message: "Événement mis à jour", event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Erreur de mise à jour", error: error.message });
  }
};

//  Supprimer un événement
export const deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Événement non trouvé" });
    res.status(200).json({ message: "Événement supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur de suppression", error: error.message });
  }
};