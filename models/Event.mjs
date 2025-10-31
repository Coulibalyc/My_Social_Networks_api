import mongoose from 'mongoose';

// Définition du schéma d'événement
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  coverPhoto: { type: String },
  isPrivate: { type: Boolean, default: false },

  // Relations
  organizers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  // Billetterie (bonus)
  tickets: [{
    name: String,
    price: Number,
    quantity: Number
  }],

  createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);
export default Event;