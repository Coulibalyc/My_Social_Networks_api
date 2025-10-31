import TicketType from "../models/ticketType.mjs";
import Event from "../models/Event.mjs";

export const createTicketType = async (req, res) => {
  try {
    const { eventId, name, amount, quantity } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Événement introuvable." });

    const ticketType = await TicketType.create({
      event: eventId,
      name,
      amount,
      quantity
    });

    res.status(201).json(ticketType);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTicketTypesByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const ticketTypes = await TicketType.find({ event: eventId });
    res.status(200).json(ticketTypes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};