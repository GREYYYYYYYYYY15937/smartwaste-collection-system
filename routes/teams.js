const express = require("express");
const router = express.Router();
const { protect, requireRole } = require("../middleware/authMiddleware");
const CollectionTeam = require("../models/CollectionTeam");

// GET all teams (Anyone logged in can view)
router.get("/", protect, async (req, res) => {
  try {
    const teams = await CollectionTeam.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch teams" });
  }
});

// CREATE a new team (Admin only)
router.post("/", protect, requireRole("admin"), async (req, res) => {
  try {
    const { team_name, service_provider, contact_number, operating_district, vehicle_registration, team_status } = req.body;
    
    // Generate a unique ID
    const count = await CollectionTeam.countDocuments();
    const newId = `TEAM0${count + 1}`;

    const newTeam = new CollectionTeam({
      _id: newId,
      team_name,
      service_provider,
      contact_number,
      operating_district,
      vehicle_registration,
      team_status
    });

    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(500).json({ error: "Failed to create team" });
  }
});

// DELETE a team (Admin only)
router.delete("/:id", protect, requireRole("admin"), async (req, res) => {
  try {
    await CollectionTeam.findByIdAndDelete(req.params.id);
    res.json({ message: "Team deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete team" });
  }
});

module.exports = router;