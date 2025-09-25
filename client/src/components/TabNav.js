import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { FaDumbbell } from "react-icons/fa";
import { MdHowToReg } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
// import PostNewWorkout from "./PostNewWorkout";
// import ShowWorkouts from "./ShowWorkouts";
import Select from "react-select";
import ChooseExercise from "./ChooseExercise";
// import { options } from "../json/exercises";
// import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";
// import {ResponsiveEmbed}
// import ReactPlayer from "react-player";
// import YoutubeEmbed from "./YoutubeEmbed";

const TabNav = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [value, setValue] = React.useState({});

  return (
    <div>
      <ChooseExercise />
      <Tabs
        defaultActiveKey="tracker"
        id="uncontrolled-tab-example"
        className="mb-3 flex justify-center"
      >
        <Tab
          eventKey="tracker"
          title={
            <span className="flex items-center">
              Tracker <FaDumbbell className="dumbell-icon" size={30} />
            </span>
          }
        >
          Tab content for Tracker
          {/* <PostNewWorkout
            workoutName={workoutName}
            setWorkoutName={setWorkoutName}
          />
          <ShowWorkouts
            workoutName={workoutName}
            setWorkoutName={setWorkoutName}
          /> */}
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
