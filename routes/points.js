const express = require("express");
const router = express.Router();
const { protect, requireRole } = require("../middleware/authMiddleware");
const CollectionPoint = require("../models/CollectionPoint");

router.get("/", protect, async (req, res) => {
  try {
    const points = await CollectionPoint.find();
    res.json(points);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch points" });
  }
});

router.post("/", protect, requireRole("admin"), async (req, res) => {
  try {
    const { name, district, area, waste_type, capacity_kg, current_status } = req.body;
    
    const count = await CollectionPoint.countDocuments();
    const newId = `PT00${count + 1}`;

    const newPoint = new CollectionPoint({
      _id: newId,
      name,
      district,
      area,
      waste_type,
      capacity_kg,
      current_status,
      location: { type: "Point", coordinates: [32.5825, 0.3476] }
    });

    await newPoint.save();
    res.status(201).json(newPoint);
  } catch (err) {
    res.status(500).json({ error: "Failed to create point" });
  }
});

module.exports = router;