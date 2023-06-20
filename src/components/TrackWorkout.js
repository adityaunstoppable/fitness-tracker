import { Accordion, Button, TextField, Typography } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
import useDate from "../utils/useDate";
import "./TrackWorkout.css";
import SetsTable from "./SetsTable";

const TrackWorkout = ({ type }) => {
  let dateString = useDate({ type: "Workout" });
  const [exercisesOverall, setExercisesOverall] = useState([]);
  const [showAddExerciseField, setShowAddExerciseField] = useState(false);
  const [addExerciseString, setAddExerciseString] = useState("");
  const [expandAllAcc, setExpandAllAcc] = useState(false);

  const addExercise = () => {
    let exerciseName = addExerciseString;
    if (exerciseName) {
      setExercisesOverall((prevState) => [
        ...prevState,
        { name: exerciseName },
      ]);
    }
    setShowAddExerciseField(false);
    setAddExerciseString("");
  };

  const cancelAddExercise = () => {
    setShowAddExerciseField(false);
    setAddExerciseString("");
  };
  console.log("ADItya checking exov", exercisesOverall);

  const expandAllAccordions = () => {
    setExpandAllAcc(true);
  };

  return (
    <div className="workout_overAll">
      <div className="workout_headingAndExpandButton">
        {type && type == "summary" ? null : dateString}
        <Button
          onClick={expandAllAccordions}
          style={{ marginLeft: "10px", height: "30px" }}
          size="small"
          variant="outlined"
        >
          Expand All
        </Button>
      </div>

      <div className="workout_accordionContainer">
        {exercisesOverall?.map((eachExercise, i) => (
          <div key={i} className="workout_accordian">
            <Accordion expanded={expandAllAcc}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={eachExercise.name}
                id={eachExercise.name}
              >
                <Typography>{`${i + 1}.) ${eachExercise.name}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SetsTable
                  exerciseName={eachExercise.name}
                  exerciseSetterFn={setExercisesOverall}
                  exercisesData={exercisesOverall}
                />
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>

      {showAddExerciseField && (
        <div className="workout__addExercise-input">
          <TextField
            onChange={(e) => setAddExerciseString(e.target.value)}
            value={addExerciseString}
            placeholder="Lat Pull Down"
            label="Exercise name"
            variant="standard"
          />
          <Button
            onClick={addExercise}
            style={{ marginLeft: "10px", height: "30px" }}
            size="small"
            variant="outlined"
          >
            Save
          </Button>
          <Button
            onClick={cancelAddExercise}
            style={{ marginLeft: "10px", height: "30px" }}
            size="small"
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        </div>
      )}

      {!showAddExerciseField && (
        <div className="workout_addButton">
          <Button
            onClick={() => setShowAddExerciseField(true)}
            size="small"
            variant="outlined"
          >
            Add Exercise +
          </Button>
        </div>
      )}
    </div>
  );
};

export default TrackWorkout;
