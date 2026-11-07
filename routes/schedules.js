const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const CollectionSchedule = require("../models/CollectionSchedule");

router.get("/", protect, async (req, res) => {
  try {
    const schedules = await CollectionSchedule.find();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch schedules" });
  }
});

module.exports = router;