import React, { useEffect, useState } from "react";
import useDate from "../utils/useDate";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setTodaySteps } from "../utils/todayContentSlice";
import "./TrackSteps.css";
import _ from "lodash"

import { saveDataByDate } from "../utils/firebaseServices";
const TrackSteps = ({ type }) => {
  let dateString = useDate({ type: "Steps" });

  const [stepsString, setStepsString] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const dispatch = useDispatch();
  const stepsStateFromRedux = useSelector((state) => state.todayContent);
  const saveSteps = () => {
    dispatch(setTodaySteps(stepsString));
    setIsDisabled(true)

    if(stepsStateFromRedux.date !== ""){
      let dateKey  = stepsStateFromRedux.date
      let data = _.cloneDeep(stepsStateFromRedux)
      data.steps = stepsString
      saveDataByDate(dateKey , data)
    }
  };

  const editSteps = () => {
    setIsDisabled(false)
  }

  useEffect(() => {
    if (stepsStateFromRedux?.steps !== "") {
      setStepsString(stepsStateFromRedux.steps);
      setIsDisabled(true);
    }
  },[]);

  return (
    <div className="steps_overAll">
      <div>{type && type == "summary" ? null : dateString}</div>
      <div className="steps_textFieldAndSaveButton">
        <TextField
          variant="standard"
          onChange={(e) => setStepsString(e.target.value)}
          disabled={isDisabled}
          value={stepsString}
          label="Steps"
        />
        {isDisabled ? (
          <Button variant="outlined" onClick={editSteps}>
            Edit
          </Button>
        ) : (
          <Button variant="outlined" onClick={saveSteps}>
            Save
          </Button>
        )}
      </div>
    </div>
  );
};

export default TrackSteps;
