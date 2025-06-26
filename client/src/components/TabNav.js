// import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { FaDumbbell } from "react-icons/fa";
import { MdHowToReg } from "react-icons/md";
import { GiProgression } from "react-icons/gi";

const TabNav = () => {
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
              {/* <i class="fa-solid fa-dumbbell"></i> */}
            </span>
          }
        >
          Tab content for Workout
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
