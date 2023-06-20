import { Button, TextField } from "@mui/material";
import React from "react";
import "./SetsTable.css"
const SetsTable = ({exerciseName , exerciseSetterFn , exercisesData}) => {
    console.log("ADITYA873 exName", exerciseName)
    console.log("ADITYA873 exerciseSetterFn",exerciseSetterFn)
    console.log("ADITYA873 exercisesData",exercisesData)
   return (
    <div>
      {/* <div className="sets_input-and-button">
        <TextField placeholder="20kgs - 10reps" fullWidth  id="standard-basic" label="Set-1" variant="standard" disabled={false} />
        <Button style={{marginLeft:"10px"}} size="small" variant="outlined">Save</Button>
      </div> */}
    
    <div className="sets_add-set-button">
      <Button size="small"variant="outlined" color="secondary" style={{height:"30px" }}>Add Set +</Button>
    </div>
    </div>
  );
};

export default SetsTable;
