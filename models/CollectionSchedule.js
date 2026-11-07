const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  _id: String,
  point_id: String,
  team_id: String,
  scheduled_date: Date,
  scheduled_time: String,
  waste_category: String,
  schedule_status: String
});

module.exports = mongoose.model("CollectionSchedule", scheduleSchema, "collection_schedules");