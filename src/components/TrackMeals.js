import React from "react";
import useDate from "../utils/useDate";

const TrackMeals = ({ type }) => {
  const dateString = useDate({ type: "Meals" });

  return (
    <div>{type && type == "summary" ? null : dateString}</div>
  );
};

export default TrackMeals;
