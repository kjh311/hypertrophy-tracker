const express = require("express");
const router = express.Router();
const LoggedExercise = require("../models/LoggedExercise");
const verifyToken = require("../middleware/verifyToken");

// POST a new logged exercise with sets, reps, and a template ID
router.post("/", verifyToken, async (req, res) => {
  const { templateId, date, sets } = req.body;

  try {
    if (!req.userId) {
      return res.status(400).json({ message: "Missing userId from Token" });
    }

    const newLoggedExercise = new LoggedExercise({
      user: req.userId,
      template: templateId,
      date,
      sets,
    });

    const saved = await newLoggedExercise.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// GET all logged exercises for a specific template
router.get("/template/:templateId", verifyToken, async (req, res) => {
  try {
    const exercises = await LoggedExercise.find({
      user: req.userId,
      template: req.params.templateId,
    }).sort({ date: -1 });
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// DELETE a logged exercise
router.delete("/:id", verifyToken, async (req, res) => {
  const loggedExerciseId = req.params.id;

  try {
    const deleted = await LoggedExercise.findOneAndDelete({
      _id: loggedExerciseId,
      user: req.userId,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Logged exercise not found or user not authorized" });
    }

    res.status(200).json({ message: "Logged exercise deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a logged exercise
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await LoggedExercise.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res
        .status(404)
        .json({ message: "Logged exercise not found or user not authorized" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
