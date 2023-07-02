import React, { useEffect, useState } from "react";
import {
  convertEpochToFormattedDate,
  convertStringDateToLocale,
} from "./constants";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { setTodayDate } from "./todayContentSlice";

const useDate = ({ type }) => {
  const [dateString, setDateString] = useState("");

  let dateFromRedux = useSelector((state) => state.todayContent);
  const dispatch = useDispatch();
  useEffect(() => {
    let today = Date.now();
    let todayFormatted = convertEpochToFormattedDate(today);
    dispatch(
      setTodayDate({
        todayDate: convertStringDateToLocale(dayjs(todayFormatted)),
      })
    );
  }, []);

  useEffect(() => {
    if (dateFromRedux.date !== "") {
      let parts = dateFromRedux.date?.split("-");
      setDateString(`${parts[1]}-${parts[0]}-${parts[2]}`);
    }
  }, [dateFromRedux]);

  return (
    <div style={{ marginTop: "20px", marginLeft: "12px" }}>
      <Typography
        variant="h6"
        color="primary"
      >{`Track ${type} -> ${dateString}`}</Typography>
    </div>
  );
};

export default useDate;
