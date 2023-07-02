import {
  Accordion,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PreviewIcon from "@mui/icons-material/Preview";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useEffect, useState } from "react";
import useDate from "../utils/useDate";
import "./TrackWorkout.css";
import SetsTable from "./SetsTable";
import { useDispatch, useSelector } from "react-redux";
import { setTodayExercises } from "../utils/todayContentSlice";
import { saveDataByDate } from "../utils/firebaseServices";
import Toaster from "./Toaster";
import { openToast } from "../utils/toastSlice";
import { useNavigate } from "react-router-dom";
import useGetDataFromFireStore from "../utils/useGetDataFromFireStore";

const TrackWorkout = ({ type }) => {
  let dateString = useDate({ type: "Workout" });
  const [exercisesOverall, setExercisesOverall] = useState([]);
  const [showAddExerciseField, setShowAddExerciseField] = useState(false);
  const [addExerciseString, setAddExerciseString] = useState("");
  const [expandState, setExpandState] = useState({});

  const history = useNavigate();
  const dispatch = useDispatch();
  const exerciseDataFromRedux = useSelector((state) => state.todayContent);
  // const dataFromFirestore = useGetDataFromFireStore("dateContent");

  const addExercise = () => {
    let exerciseName = addExerciseString;
    if (exerciseName) {
      let exContent = { name: exerciseName, sets: [], notes: "" };
      dispatch(setTodayExercises(exContent));
      setExpandState((prevState) => ({ ...prevState, [exerciseName]: true }));
    }
    setShowAddExerciseField(false);
    setAddExerciseString("");
  };


  // useEffect(() => {
  //   if (dataFromFirestore?.length > 0 ) {
  //     dataFromFirestore.map((doc) => {
  //       if (doc.date == homeStateFromRedux?.date) {
  //         if(doc.exercises && doc.exercises.length >0){
  //           dispatch(setTodayExercisesFromFirestore(doc.exercises))
  //         }
  //         if(doc.impNotes){
  //           dispatch(setTodayImportantNotes(doc.impNotes))
  //         }
  //         if(doc.sleep){
  //           dispatch(setTodaySleeps(doc.sleep))
  //         }
  //         if(doc.steps){
  //           dispatch(setTodaySteps(doc.steps))
  //         }
  //       }
  //     });
  //   }
  // }, [dataFromFirestore]);

  useEffect(() => {
    if (exerciseDataFromRedux?.exercises.length > 0) {
      setExercisesOverall(exerciseDataFromRedux.exercises);
    }
  }, [showAddExerciseField]);

  useEffect(() => {
    let expandStateFiller = {};
    if (exerciseDataFromRedux?.exercises.length > 0) {
      exerciseDataFromRedux.exercises.map((eachEx) => {
        expandStateFiller[eachEx.name] = true;
      });
    }
    setExpandState(expandStateFiller);
  }, []);


  
  const cancelAddExercise = () => {
    setShowAddExerciseField(false);
    setAddExerciseString("");
  };

  const expandOrHideAllAccordions = (type) => {
    let newObj = _.cloneDeep(expandState);
    for (let key in newObj) {
      if (type == "expand") {
        newObj[key] = true;
      } else {
        newObj[key] = false;
      }
    }
    setExpandState(newObj);
  };

  const changeSpecificExpandState = (exerciseName) => {
    let newObj = _.cloneDeep(expandState);
    for (let key in newObj) {
      if (key == exerciseName.name) {
        newObj[key] = !newObj[key];
      }
    }
    setExpandState(newObj);
  };

  const saveDataInFirestore = () => {
    if (exerciseDataFromRedux.date !== "") {
      let dateKey = exerciseDataFromRedux.date;
      let data = exerciseDataFromRedux;
      const openToastFn = (open, message, severity) => {
        dispatch(openToast({ open, message, severity }));
        setTimeout(() => {
          dispatch(openToast({ open: false, message: "", severity: "" }));
        }, 4000);
      };
      saveDataByDate(dateKey, data, openToastFn);
      history("/");
    }
  };

  return (
    <div className="workout_overAll">
      <div className="workout_headingAndExpandButton">
        {type && type == "summary" ? null : dateString}
        {exercisesOverall.length > 0 && (
          <div>
            <IconButton
              onClick={() => expandOrHideAllAccordions("expand")}
              style={{ marginLeft: "10px", height: "30px" }}
              size="small"
              variant="outlined"
            >
              <PreviewIcon color="secondary" />
            </IconButton>
            <IconButton
              onClick={() => expandOrHideAllAccordions("hide")}
              style={{ marginLeft: "10px", height: "30px" }}
              size="small"
              variant="outlined"
            >
              <VisibilityOffIcon color="secondary" />
            </IconButton>
          </div>
        )}
      </div>

      <div className="workout_accordionContainer">
        {exercisesOverall?.map((eachExercise, i) => (
          <div key={i} className="workout_accordian">
            <Accordion expanded={expandState[eachExercise?.name]}>
              <AccordionSummary
                expandIcon={
                  <IconButton>
                    <ExpandMoreIcon
                      onClick={() => changeSpecificExpandState(eachExercise)}
                    />
                  </IconButton>
                }
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

      {exercisesOverall.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Button
            onClick={saveDataInFirestore}
            size="small"
            variant="outlined"
            color="secondary"
          >
            Save Workout
          </Button>
        </div>
      )}
    </div>
  );
};

export default TrackWorkout;
