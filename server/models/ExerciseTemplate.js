const mongoose = require("mongoose");

const ExerciseTemplateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  // New field to store the category (e.g., Biceps, Shoulders, Measurements)
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ExerciseTemplate", ExerciseTemplateSchema);
