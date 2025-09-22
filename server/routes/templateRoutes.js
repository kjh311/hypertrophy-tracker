const express = require("express");
const router = express.Router();
const ExerciseTemplate = require("../models/ExerciseTemplate");
const verifyToken = require("../middleware/verifyToken");

// POST a new exercise/measurement template
router.post("/", verifyToken, async (req, res) => {
  const { name } = req.body;

  try {
    if (!req.userId) {
      return res.status(400).json({ message: "Missing userId from Token" });
    }

    const newTemplate = new ExerciseTemplate({
      user: req.userId,
      name,
    });

    const saved = await newTemplate.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// GET all exercise/measurement templates for the authenticated user
router.get("/", verifyToken, async (req, res) => {
  try {
    const templates = await ExerciseTemplate.find({ user: req.userId });
    res.json(templates);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
