const express = require("express");
const router = express.Router();
const { protect, requireRole } = require("../middleware/authMiddleware"); 
const WasteReport = require("../models/WasteReport"); 

router.get("/", protect, async (req, res) => {
  try {
    const reports = await WasteReport.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

router.patch("/:id/assign", protect, requireRole("admin", "dispatcher"), async (req, res) => {
  try {
    const { team_id } = req.body;
    const updatedReport = await WasteReport.findByIdAndUpdate(
      req.params.id, 
      { status: "Assigned", assigned_team_id: team_id },
      { new: true }
    );
    res.json(updatedReport);
  } catch (err) {
    res.status(500).json({ error: "Failed to assign team" });
  }
});

router.delete("/:id", protect, requireRole("admin"), async (req, res) => {
  try {
    await WasteReport.findByIdAndDelete(req.params.id);
    res.json({ message: "Report deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete report" });
  }
});

module.exports = router;