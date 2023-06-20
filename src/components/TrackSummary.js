import { Typography } from "@mui/material";
import React from "react";

import "./TrackSummary.css";
import TrackWorkout from "./TrackWorkout";
import useDate from "../utils/useDate";

const TrackSummary = () => {

  let dateString = useDate({type:"Summary"})

  return (
    <div className="summary_overall">
      {dateString}

      <div className="summary_trackWorkout">
        <TrackWorkout type="summary" />
      </div>
    </div>
  );
};

export default TrackSummary;
