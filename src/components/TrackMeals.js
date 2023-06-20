import React from "react";
import useDate from "../utils/useDate";

const TrackMeals = ({ type }) => {
  const dateString = useDate({ type: "Meals" });

  return (
    <div>
      <div>{type && type == "summary" ? null : dateString}</div>
    </div>
  );
};

export default TrackMeals;
