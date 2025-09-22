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

// Define the main Exercise schema
const ExerciseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
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

module.exports = mongoose.model("Exercise", ExerciseSchema);
