const mongoose = require('mongoose');

const HarvestSchema = new mongoose.Schema({
  farmerId: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  produceName: { type: String, required: true },
  variety: { type: String },
  harvestDate: { type: Date, required: true },
  harvestTime: { type: String, required: true },
  totalWeight: { type: Number, required: true },
  numberOfUnits: { type: Number },
  handlingInstructions: { type: String },
  pesticidesUsed: { type: String },
  fertilizersUsed: { type: String },
  additionalNotes: { type: String },
  qrCode: {
    type: String, 
  },
});

const Harvest = mongoose.model('Harvest', HarvestSchema);

module.exports = Harvest;
