const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
  _id: String,
  name: String,
  district: String,
  area: String,
  waste_type: String,
  capacity_kg: Number,
  current_status: {
    type: String,
    enum: ["Normal", "Full", "Empty", "Overflowing"]
  },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], default: [0, 0] } // [longitude, latitude]
  }
});

pointSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("CollectionPoint", pointSchema, "collection_points");
