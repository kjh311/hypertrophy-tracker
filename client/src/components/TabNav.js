import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { FaDumbbell } from "react-icons/fa";
import { MdHowToReg } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import PostNewWorkout from "./PostNewWorkout";
import ShowWorkouts from "./ShowWorkouts";

const TabNav = () => {
  const [workoutName, setWorkoutName] = useState("");

  return (
    <div>
      <Tabs
        defaultActiveKey="workout"
        id="uncontrolled-tab-example"
        className="mb-3 flex justify-center"
      >
        <Tab
          eventKey="workout"
          title={
            <span className="flex items-center">
              Workout <FaDumbbell className="dumbell-icon" size={30} />
            </span>
          }
        >
          Tab content for Workout
          <PostNewWorkout
            workoutName={workoutName}
            setWorkoutName={setWorkoutName}
          />
          <ShowWorkouts
            workoutName={workoutName}
            setWorkoutName={setWorkoutName}
          />
        </Tab>
        <Tab
          eventKey="instructions"
          title={
            <span className="flex items-center">
              Instructions <MdHowToReg size={30} />
            </span>
          }
        >
          Tab content for Instructions
        </Tab>
        <Tab
          eventKey="progress"
          title={
            <span className="flex items-center">
              Progress <GiProgression size={30} />
            </span>
          }
        >
          Tab content for Progress
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabNav;
