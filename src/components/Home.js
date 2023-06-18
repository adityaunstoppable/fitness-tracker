import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "./Home.css"
import dayjs from "dayjs";
const Home = () => {

  const [date , setDate] = useState(dayjs("2023-06-18"))
  console.log("ADITYA date" , date.$d)
  return (
    <div>
      
      <div className="home_calendar">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar value={date} onChange={newValue => setDate(newValue)} />
      </LocalizationProvider>
      </div>
    </div>
  );
};

export default Home;
