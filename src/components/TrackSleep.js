import React, { useEffect, useState } from "react";
import useDate from "../utils/useDate";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash"
import "./TrackSleep.css";
import { hoursArray } from "../utils/constants";
import { setTodaySleeps } from "../utils/todayContentSlice";
import { useDispatch, useSelector } from "react-redux";
import { saveDataByDate } from "../utils/firebaseServices";

const TrackSleep = ({ type }) => {
  let dateString = useDate({ type: "Sleep" });
  const [sleepHours, setSleepHours] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(true);
  const dispatch = useDispatch();
  const sleepStateFromRedux = useSelector((state) => state.todayContent);

  useEffect(() => {
    if (sleepStateFromRedux.sleep !== "") {
      setSleepHours(sleepStateFromRedux.sleep);
      setShowSaveButton(false);
    }
  }, []);

  const handleChange = (value) => {
    setSleepHours(value);
  };

  const saveSleepFn = () => {
    if (sleepHours) {
      dispatch(setTodaySleeps(sleepHours));
    }
    setShowSaveButton(false);
    if(sleepStateFromRedux.date !== ""){
      let dateKey  = sleepStateFromRedux.date
      let data = _.cloneDeep(sleepStateFromRedux)
      data.sleep = sleepHours
      saveDataByDate(dateKey , data)
    }
  };

  const editHours = () => {
    setShowSaveButton(true);
  };

  return (
    <div className="sleep_overAll">
      <div>{type && type == "summary" ? null : dateString}</div>
      <div className="sleep_heading">
        <Typography color={"secondary"} variant="h5">
          How many hours of sleep you took today ?
        </Typography>
      </div>

      {showSaveButton ? (
        <div className="sleep_select">
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Hours</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={sleepHours}
              label="Hours"
              onChange={(e) => handleChange(e.target.value)}
            >
              {hoursArray.map((val) => (
                <MenuItem value={val}>{val}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            style={{ height: "40px" }}
            onClick={saveSleepFn}
          >
            Save
          </Button>
        </div>
      ) : (
        <div className="sleep_select">
          <TextField
            label="Sleep"
            id={sleepHours}
            disabled={true}
            variant="standard"
            value={sleepHours + " hours"}
          />

          <Button
            variant="outlined"
            style={{ height: "40px" }}
            onClick={editHours}
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};

export default TrackSleep;
