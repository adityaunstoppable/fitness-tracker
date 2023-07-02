import React, { useEffect, useState } from "react";
import useDate from "../utils/useDate";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setTodayImportantNotes } from "../utils/todayContentSlice";
import "./ImportantNotes.css";
import { saveDataByDate } from "../utils/firebaseServices";
import _ from "lodash";
import { openToast } from "../utils/toastSlice";
import { useNavigate } from "react-router-dom";

const ImportantNotes = ({ type }) => {
  let dateString = useDate({ type: "Important Notes" });

  const [impString, setImpString] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const history = useNavigate()
  const dispatch = useDispatch();
  const impNotesStateFromRedux = useSelector((state) => state.todayContent);
  const saveImpNotes = () => {
    dispatch(setTodayImportantNotes(impString));
    setIsDisabled(true);

    if (impNotesStateFromRedux.date !== "") {
      let dateKey = impNotesStateFromRedux.date;
      let data = _.cloneDeep(impNotesStateFromRedux);
      data.impNotes = impString;
      const openToastFn = (open , message, severity) => {
        dispatch(openToast({open , message , severity}))
        setTimeout(() => {
          dispatch(openToast({open:false , message:"" , severity:""}))
        }, 4000);
      }
      saveDataByDate(dateKey, data , openToastFn);
      history("/")
    }
  };

  const editImp = () => {
    setIsDisabled(false);
  };

  useEffect(() => {
    if (impNotesStateFromRedux?.impNotes !== "") {
      setImpString(impNotesStateFromRedux.impNotes);
      setIsDisabled(true);
    }
  }, []);

  return (
    <div className="imp_overAll">
      <div>{type && type == "summary" ? null : dateString}</div>
      <div className="imp_textFieldAndSaveButton">
        <TextField
          variant="standard"
          multiline
          onChange={(e) => setImpString(e.target.value)}
          disabled={isDisabled}
          value={impString}
          label="Important Notes"
          fullWidth
          style={{ marginLeft: "10px", marginRight: "20px" }}
        />
        {isDisabled ? (
          <Button variant="outlined" onClick={editImp}>
            Edit
          </Button>
        ) : (
          <Button variant="outlined" onClick={saveImpNotes}>
            Save
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImportantNotes;
