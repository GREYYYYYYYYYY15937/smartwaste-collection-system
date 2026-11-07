const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  _id: String,
  team_name: String,
  service_provider: String,
  contact_number: String,
  operating_district: String,
  vehicle_registration: String,
  team_status: String
});

module.exports = mongoose.model("CollectionTeam", teamSchema, "collection_teams");