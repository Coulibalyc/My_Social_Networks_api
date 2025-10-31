import Ticket from "../models/ticket.mjs";
import TicketType from "../models/ticketType.mjs";

export const createTicket = async (req, res) => {
  try {
    const { ticketTypeId, firstName, lastName, address } = req.body;

    const ticketType = await TicketType.findById(ticketTypeId);
    if (!ticketType) return res.status(404).json({ message: "Type de billet introuvable." });

    const count = await Ticket.countDocuments({ ticketType: ticketTypeId });
    if (count >= ticketType.quantity)
      return res.status(400).json({ message: "Nombre de billets atteint." });

    const ticket = await Ticket.create({
      ticketType: ticketTypeId,
      firstName,
      lastName,
      address
    });

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTicketsByType = async (req, res) => {
  try {
    const { ticketTypeId } = req.params;
    const tickets = await Ticket.find({ ticketType: ticketTypeId });
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};