const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");
const verifyToken = require("../middleware/verifyToken");
// const Transaction = require("../models/Transaction");

// POST NEW WORKOUT

router.post("/", verifyToken, async (req, res) => {
  const { name } = req.body;

  try {
    const newWorkout = new Workout({
      user: req.userId,
      name,
    });

    if (!req.userId) {
      return res.status(400).json({ message: "Missing userId from Token" });
    }

    const saved = await newWorkout.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// GET ALL Workouts

router.get("/", verifyToken, async (req, res) => {
  try {
    const subs = await Workout.find({ user: req.userId });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

//Get all EXPENSE sucategories with their transactions

// router.get("/expense-with-transactions", verifyToken, async (req, res) => {
//   try {
//     const expenseSubs = await Workout.find({
//       user: req.userId,
//       categoryType: "expense",
//     });

//     const subsWithTransactions = await Promise.all(
//       expenseSubs.map(async (sub) => {
//         const transactions = await Transaction.find({
//           user: req.userId,
//           workout: sub._id,
//         }).sort({ date: -1 });

//         return {
//           ...sub._doc,
//           transactions,
//         };
//       })
//     );

//     res.json(subsWithTransactions);
//   } catch (err) {
//     res.status(500).json({ err: err.message });
//   }
// });

//Get all BILLS sucategories with their transactions

// router.get("/bills-with-transactions", verifyToken, async (req, res) => {
//   try {
//     const expenseSubs = await Subcategory.find({
//       user: req.userId,
//       categoryType: "bills",
//     });

//     const subsWithTransactions = await Promise.all(
//       expenseSubs.map(async (sub) => {
//         const transactions = await Transaction.find({
//           user: req.userId,
//           subcategory: sub._id,
//         }).sort({ date: -1 });

//         return {
//           ...sub._doc,
//           transactions,
//         };
//       })
//     );

//     res.json(subsWithTransactions);
//   } catch (err) {
//     res.status(500).json({ err: err.message });
//   }
// });

//Get all INCOME sucategories with their transactions

// router.get("/income-with-transactions", verifyToken, async (req, res) => {
//   try {
//     const expenseSubs = await Subcategory.find({
//       user: req.userId,
//       categoryType: "income",
//     });

//     const subsWithTransactions = await Promise.all(
//       expenseSubs.map(async (sub) => {
//         const transactions = await Transaction.find({
//           user: req.userId,
//           subcategory: sub._id,
//         }).sort({ date: -1 });

//         return {
//           ...sub._doc,
//           transactions,
//         };
//       })
//     );

//     res.json(subsWithTransactions);
//   } catch (err) {
//     res.status(500).json({ err: err.message });
//   }
// });

//Get all SAVINGS sucategories with their transactions

// router.get("/savings-with-transactions", verifyToken, async (req, res) => {
//   try {
//     const expenseSubs = await Subcategory.find({
//       user: req.userId,
//       categoryType: "savings",
//     });

//     const subsWithTransactions = await Promise.all(
//       expenseSubs.map(async (sub) => {
//         const transactions = await Transaction.find({
//           user: req.userId,
//           subcategory: sub._id,
//         }).sort({ date: -1 });

//         return {
//           ...sub._doc,
//           transactions,
//         };
//       })
//     );

//     res.json(subsWithTransactions);
//   } catch (err) {
//     res.status(500).json({ err: err.message });
//   }
// });

// DELETE WORKOUT AND Exercises
// router.delete("/:id", verifyToken, async (req, res) => {
//   const workoutId = req.params.id;

//   try {
//     await Workout.findByIdAndDelete(workoutId);

//     await Transaction.deleteMany({ workout: workoutId });

//     res
//       .status(200)
//       .json({ message: "Workout and its exercises deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// UPDATE Workout
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
