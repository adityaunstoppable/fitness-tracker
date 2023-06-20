import React from "react";
import useDate from "../utils/useDate";

const TrackSteps = ({ type }) => {
  let dateString = useDate({ type: "Steps" });

  return (
    <div className="steps_overAll">
      <div>{type && type == "summary" ? null : dateString}</div>
    </div>
  );
};

export default TrackSteps;
