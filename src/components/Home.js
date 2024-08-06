// summary, disabled sets design and edit feature,

import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import "./Home.css";
import TrackSummary from "./TrackSummary";
import {
  convertEpochToFormattedDate,
  convertStringDateToLocale,
  listItems,
} from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setDateState } from "../utils/dateSlice";
import _ from "lodash";
import {
  setTodayDate,
  setTodayExercisesFromFirestore,
  setTodayImportantNotes,
  setTodaySleeps,
  setTodaySteps,
} from "../utils/todayContentSlice";
import useGetDataFromFireStore from "../utils/useGetDataFromFireStore";
import {
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TrackWorkout from "./TrackWorkout";
import { useNavigate } from "react-router-dom";
const Home = () => {
  let today = Date.now();
  let todayFormatted = convertEpochToFormattedDate(today);

  const [date, setDate] = useState(dayjs(todayFormatted));
  const [selectedIndianDate, setSelectedIndianDate] = useState("");
  const [isTodaySelected, setIsTodaySelected] = useState(false);
  const [selectedDateData, setSelectedDateData] = useState({});
  const dispatch = useDispatch();
  const navigateTo = useNavigate()
  const dataFromFirestore = useGetDataFromFireStore("dateContent");
  const homeStateFromRedux = useSelector((state) => state.todayContent);
  const dateStateFromRedux = useSelector((state) => state.date);

  useEffect(() => {
    dispatch(setDateState(convertStringDateToLocale(date)));
  }, [date]);

  useEffect(() => {
    if (dataFromFirestore.length > 0) {
      let selectedDateDataTemp = dataFromFirestore.filter(
        (doc) => doc.date == dateStateFromRedux.selectedDate
      );
      if (selectedDateDataTemp.length > 0) {
        setSelectedDateData(selectedDateDataTemp[0]);
      } else {
        setSelectedDateData({});
      }
    }

    if (dateStateFromRedux.selectedDate != "") {
      let parts = dateStateFromRedux.selectedDate?.split("-");
      setSelectedIndianDate(`${parts[1]}-${parts[0]}-${parts[2]}`);
      if (
        dateStateFromRedux.selectedDate ===
        convertStringDateToLocale(todayFormatted)
      ) {
        setIsTodaySelected(true);
      } else {
        setIsTodaySelected(false);
      }
    }
  }, [dateStateFromRedux, dataFromFirestore]);

  useEffect(() => {
    dispatch(
      setTodayDate({
        todayDate: convertStringDateToLocale(dayjs(todayFormatted)),
      })
    );
  }, []);

  useEffect(() => {
    if (dataFromFirestore?.length > 0) {
      let selectedDateDataTemp = dataFromFirestore.filter(
        (doc) => doc.date == dateStateFromRedux.selectedDate
      );
      if (selectedDateDataTemp.length > 0) {
        setSelectedDateData(selectedDateDataTemp[0]);
      } else {
        setSelectedDateData({});
      }
      dataFromFirestore.map((doc) => {
        if (doc.date == homeStateFromRedux?.date) {
          if (doc.exercises && doc.exercises.length > 0) {
            dispatch(setTodayExercisesFromFirestore(doc.exercises));
          }
          if (doc.impNotes) {
            dispatch(setTodayImportantNotes(doc.impNotes));
          }
          if (doc.sleep) {
            dispatch(setTodaySleeps(doc.sleep));
          }
          if (doc.steps) {
            dispatch(setTodaySteps(doc.steps));
          }
        }
      });
    }
  }, [dataFromFirestore]);

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
          backgroundColor: "#D3D3D3 ",
          margin: "auto",
        }}
      ></div>

      {/* Date summary */}

      {selectedIndianDate != "" && !_.isEmpty(selectedDateData) ? (
        <div className="home_summary">
          <div className="summary_main-heading">
            <Typography variant="h6" color="primary">
              Summary of {selectedIndianDate}
            </Typography>
          </div>

          <div style={{ marginTop: "10px" }} className="summary_otherInfoTable">
            <TableContainer
              style={{ border: "1px solid #d3d3d3" }}
              component={Paper}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{ borderLeft: "1px solid #d3d3d3" }}
                      sx={{ fontWeight: "600" }}
                      align="center"
                    >
                      Sleep
                    </TableCell>
                    <TableCell
                      style={{ borderLeft: "1px solid #d3d3d3" }}
                      sx={{ fontWeight: "600" }}
                      align="center"
                    >
                      Steps
                    </TableCell>
                    <TableCell
                      style={{ borderLeft: "1px solid #d3d3d3" }}
                      sx={{ fontWeight: "600" }}
                      align="center"
                    >
                      Important Notes
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableCell
                    style={{ borderLeft: "1px solid #d3d3d3" }}
                    align="center"
                  >
                    {selectedDateData?.sleep != ""
                      ? `${selectedDateData?.sleep} hours`
                      : "NA"}
                  </TableCell>
                  <TableCell
                    style={{ borderLeft: "1px solid #d3d3d3" }}
                    align="center"
                  >
                    {selectedDateData?.steps != ""
                      ? `${selectedDateData?.steps}`
                      : "NA"}{" "}
                  </TableCell>
                  <TableCell
                    style={{ borderLeft: "1px solid #d3d3d3" }}
                    align="center"
                  >
                    {selectedDateData?.impNotes != ""
                      ? `${selectedDateData?.impNotes}`
                      : "NA"}{" "}
                  </TableCell>
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div className="summary_workoutHeading">
            <Typography variant="h6" color="primary">
              Workouts
            </Typography>
          </div>
          {selectedDateData?.exercises?.map((eachEx) => {
            let notes = eachEx.notes || "";
            let sets = eachEx.sets || [];
            let name = eachEx.name || "";

            return (
              <div className="summary_workoutCard">
                <Card>
                  <CardContent>
                    <div className="summary_workoutHeading">
                      <Typography fontSize={20}>{name}</Typography>
                    </div>
                    {sets.length > 0 &&
                      sets.map((eachSet, i) => {
                        let property;
                        let value;
                        let backgroundColor =
                          i % 2 === 0 ? "rgb(237, 238, 238)" : "transparent";
                        for (let key in eachSet) {
                          property = key;
                          value = eachSet[key];
                        }
                        return (
                          <div
                            className="summary_workoutSets"
                            style={{ backgroundColor }}
                          >
                            <Typography>{property}</Typography>
                            <Typography>{value}</Typography>
                          </div>
                        );
                      })}

                    {notes != "" && (
                      <div className="summary_workoutSetsNotes">
                        <Typography color="secondary">
                          Notes : {notes}
                        </Typography>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <div>
            {isTodaySelected ? (
              <div className="flex flex-wrap text-center justify-center m-auto w-[90%] ">
                {listItems.map((eachPath) => {
                  if(eachPath.name !== 'Home'){
                    return (
                      <button onClick={() => navigateTo(`/${eachPath.path}`)} className="px-3 z-10 w-64 cursor-pointer  hover:bg-yellow-800 hover:text-white py-3 mr-10 mt-10 bg-transparent border rounded-lg ">
                        {eachPath.name}
                      </button>
                    );
                  }
                  
                })}
              </div>
            ) : (
              <div style={{textAlign:'center', marginTop: '50px' , marginLeft:'-20px'}}>
              <Typography color='secondary'>{selectedIndianDate}</Typography>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

