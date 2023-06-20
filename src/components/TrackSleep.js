import React from "react";
import useDate from "../utils/useDate";

const TrackSleep = ({ type }) => {
  let dateString = useDate({ type: "Sleep" });

  return (
    <div className="sleep_overAll">
      <div>{type && type == "summary" ? null : dateString}</div>
    </div>
  );
};

export default TrackSleep;
