const express = require("express");
const router = express.Router();
const Exercise = require("../models/Exercise"); // Corrected path to the new model
const verifyToken = require("../middleware/verifyToken");

// POST a new exercise with sets, reps, and weight
router.post("/", verifyToken, async (req, res) => {
  const { name, date, sets } = req.body;

  try {
    if (!req.userId) {
      return res.status(400).json({ message: "Missing userId from Token" });
    }

    const newExercise = new Exercise({
      user: req.userId,
      name,
      date,
      sets, // Assign the sets array directly from the request body
    });

    const saved = await newExercise.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// GET all exercises for the authenticated user
router.get("/", verifyToken, async (req, res) => {
  try {
    const exercises = await Exercise.find({ user: req.userId }).sort({
      date: -1,
    });
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// DELETE an exercise
router.delete("/:id", verifyToken, async (req, res) => {
  const exerciseId = req.params.id;

  try {
    const deleted = await Exercise.findOneAndDelete({
      _id: exerciseId,
      user: req.userId,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Exercise not found or user not authorized" });
    }

    res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE an exercise
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Exercise.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res
        .status(404)
        .json({ message: "Exercise not found or user not authorized" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
