import { Button, IconButton, TextField, TextareaAutosize } from "@mui/material";
import React, { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./SetsTable.css";
import {
  editTodayExercisesSets,
  setTodayExerciseNotes,
  setTodayExercises,
  setTodayExericeSets,
  setTodayImportantNotes,
} from "../utils/todayContentSlice";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
const SetsTable = ({ exerciseName, exerciseSetterFn, exercisesData }) => {
  const [setsCount, addSetsCount] = useState([]);
  const [displayAddSetField, setDisplayAddSetField] = useState(false);
  const [thisExerDataSets, setThisExerDataSets] = useState([]);
  const [setString, setSetString] = useState("");
  const [impNotesString, setImpNotesString] = useState("");
  const [editableSetState, setEditableSetState] = useState({});

  const dispatch = useDispatch();
  const exerciseDataFromRedux = useSelector((state) => state.todayContent);

  useEffect(() => {
    let thisExData = [];
    exerciseDataFromRedux.exercises?.map((eachExData) => {
      if (eachExData.name === exerciseName) {
        thisExData = eachExData.sets;
      }
    });
    setThisExerDataSets(thisExData);
  }, [displayAddSetField]);

  useEffect(() => {
    let thisExData = [];
    exerciseDataFromRedux.exercises?.map((eachExData) => {
      if (eachExData.name === exerciseName) {
        thisExData = eachExData.sets;
        setImpNotesString(eachExData.notes)
      }
    });
    let tempEditableState = {}
    if(thisExData.length > 0){
      thisExData?.map((eachSet,i) => {
        let string = eachSet[`Set${i+1}`]
        tempEditableState[i+1] = {isDisable : true , string }
      })
    }
    setEditableSetState(tempEditableState)
    setThisExerDataSets(thisExData);
  },[])

  const addSetDisplay = () => {
    setDisplayAddSetField(true);
  };

  const addSet = (setNum ) => {
    addSetsCount((prevState) => [...prevState, setNum]);
    setEditableSetState((prevState) => ({ ...prevState, [setNum]: {isDisable:true , string : setString}  }));
    setSetString("");
    setDisplayAddSetField(false);
    dispatch(setTodayExericeSets({ setNum, setString, exerciseName }));
  };

  const addImportantNotes = () => {
    if (impNotesString && impNotesString !== "") {
      dispatch(setTodayExerciseNotes({ impNotesString, exerciseName }));
    }
  };

  const editSet = (setNum) => {
    let editableSetsCopy = _.cloneDeep(editableSetState);
    editableSetsCopy[setNum] = { ...editableSetsCopy[setNum]  , isDisable: false};
    setEditableSetState(editableSetsCopy);
  };

  const saveEditedSet = (setNum) => {
    let editableSetsCopy = _.cloneDeep(editableSetState);
    editableSetsCopy[setNum] = { ...editableSetsCopy[setNum]  , isDisable: true};
    setEditableSetState(editableSetsCopy);
    dispatch(editTodayExercisesSets({ setNum, setString :editableSetsCopy[setNum]["string"], exerciseName }));
  }

  const setEditingFieldString = (setNum , value) => {

    //use debouncing here bro

    let editableSetsCopy = _.cloneDeep(editableSetState);
    editableSetsCopy[setNum] = {...editableSetsCopy[setNum] , string:value};
    setEditableSetState(editableSetsCopy);
    
  }


  return (
    <div>
      {thisExerDataSets?.map((eachSet, i) => (
        <div className="sets_input-and-button" style={{ alignItems: "start" }}>
          <TextField
            fullWidth
            id={`${exerciseName}-${i + 1}`}
            label={`Set-${i + 1}`}
            variant="outlined"
            size="small"
            onChange={(e) => setEditingFieldString(i+1 , e.target.value)}
            disabled={editableSetState[i + 1].isDisable}
            defaultValue={eachSet[`Set${i + 1}`]}
            style={{ marginBottom: "10px" }}
          />
          {editableSetState[i + 1].isDisable ? (
            <IconButton>
              <EditIcon onClick={() => editSet(i + 1)} />
            </IconButton>
          ) : (
            <IconButton>
              <SaveIcon onClick={() => saveEditedSet(i + 1)} />
            </IconButton>
          )}
        </div>
      ))}

      {displayAddSetField && (
        <div className="sets_input-and-button">
          <TextField
            placeholder="20kgs - 10reps"
            fullWidth
            focused
            id={`${exerciseName}-${setsCount.length + 1}`}
            label={`Set-${setsCount.length + 1}`}
            variant="standard"
            disabled={false}
            onChange={(e) => setSetString(e.target.value)}
          />
          <IconButton
            onClick={() => addSet(setsCount.length + 1)}
            style={{ marginLeft: "10px" }}
            size="small"
            variant="outlined"
          >
            <SaveIcon />
          </IconButton>
          <IconButton
            onClick={() => setDisplayAddSetField(false)}
            style={{ marginLeft: "10px" }}
            size="small"
            variant="outlined"
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      )}

      {!displayAddSetField && (
        <div className="sets_add-set-button">
          <Button
            onClick={addSetDisplay}
            size="small"
            variant="outlined"
            color="secondary"
            style={{ height: "30px", marginTop: "10px" }}
          >
            Add Set +
          </Button>
        </div>
      )}

      <div className="sets_input-and-button">
        <TextField
          placeholder="Did 5 reps extra, Good Pump"
          fullWidth
          style={{ marginTop: "10px" }}
          multiline
          id={`${exerciseName}-impNotes`}
          label={"Important Notes (Always Editable)"}
          variant="standard"
          defaultValue={impNotesString}
          onChange={(e) => setImpNotesString(e.target.value)}
        />
        <IconButton
          onClick={() => addImportantNotes()}
          style={{ marginLeft: "10px" }}
          size="small"
          variant="outlined"
        >
          <SaveIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default SetsTable;
