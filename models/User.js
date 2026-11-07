const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: { type: String, unique: true, required: true },
  password_hash: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "dispatcher", "team_member", "reporter"],
    default: "reporter"
  },
  team_id: String 
});

module.exports = mongoose.model("User", userSchema);
