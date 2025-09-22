const mongoose = require("mongoose");

// Define a schema for a single set
const SetSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
});

// Define the main LoggedExercise schema
const LoggedExerciseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExerciseTemplate",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  sets: {
    type: [SetSchema],
    default: [],
  },
});

module.exports = mongoose.model("LoggedExercise", LoggedExerciseSchema);
