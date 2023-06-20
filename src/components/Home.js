import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import "./Home.css";
import TrackSummary from "./TrackSummary";
import { convertEpochToFormattedDate, convertStringDateToLocale } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setDateState } from "../utils/dateSlice";
const Home = () => {
  let today = Date.now();
  let todayFormatted = convertEpochToFormattedDate(today)

  const [date, setDate] = useState(dayjs(todayFormatted));
  const dateFromRedux = useSelector(state => state.date)
  console.log("dateFromRedux" , dateFromRedux)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(setDateState(convertStringDateToLocale(date)))
  },[date])

  return (
    <div>
      {/* calendar */}
      <div className="home_calendar">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
        </LocalizationProvider>
      </div>

      <div
        style={{
          height: "1px",
          width: "50%",
          backgroundColor: "gray",
          margin:"auto"
        }}
      ></div>

      {/* Date summary */}
      <div className="home_summary">
        <TrackSummary />
      </div>
    </div>
  );
};

export default Home;
