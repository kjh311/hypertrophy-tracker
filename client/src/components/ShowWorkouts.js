import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowWorkouts = ({ workoutName, setWorkoutName }) => {
  const [workouts, setWorkouts] = useState([]);

  const workoutGettUrl =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8080/api/workouts`
      : `https://mern-expense-tracker-v5y1.onrender.com/api/transactions`;

  const getWorkouts = () => {
    axios
      .get(workoutGettUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("hypertrophy-token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => setWorkouts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    console.log(workouts);
    getWorkouts();
    // setWorkouts([...workouts, workoutName]);
  }, []);

  return (
    <div>
      {workouts.length > 0 && (
        <div>
          <h1> Workouts:</h1>
          <br />
          <ul>
            {workouts.map((workout) => {
              return (
                <li key={workout._id}>
                  <h2>{workout.name}</h2>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShowWorkouts;
