import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoCloseCircle } from "react-icons/io5";

const PostNewWorkout = () => {
  const [showModal, setShowModal] = useState(false);
  const [workoutName, setWorkoutName] = useState("");

  const handleClose = () => {
    setShowModal(false);
    // setExpanded(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
    // alert("works");
  };

  const workoutPostUrl =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8080/api/workouts`
      : `https://mern-expense-tracker-v5y1.onrender.com/api/transactions`;

  const handlePostWorkout = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        workoutPostUrl,
        {
          name: workoutName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "hypertrophy-token"
            )}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Workout posted:", res.data);
      setWorkoutName("");
      setShowModal(false);
    } catch (err) {
      console.error("Failed to post workout", err);
    }
  };

  return (
    <div>
      <button onClick={handleShowModal} className="p-2 m-2 bg-red-500">
        Add Workout
      </button>
      {showModal && (
        <div className="add-workout-modal-backdrop text-center z-10">
          <div className={`add-workout-modal relative `}>
            <button
              onClick={handleClose}
              className={`react-icon 
                            text-white text-4xl transition-all duration-200 absolute top-2 right-2`}
            >
              <IoCloseCircle />
            </button>
            <h3 className="text-white">Add New Workout</h3>
            <form onSubmit={handlePostWorkout}>
              <input
                type="text"
                value={workoutName}
                className="p-2 m-2"
                placeholder="Name your new workout"
                onChange={(e) => setWorkoutName(e.target.value)}
              />
              <button type="submit" className="p-2 m-2 bg-red-500">
                Add Workout
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostNewWorkout;
