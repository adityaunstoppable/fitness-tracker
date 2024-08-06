/* eslint-disable no-unused-vars */
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import TrackWorkout from "./components/TrackWorkout";
import TrackMeals from "./components/TrackMeals";
import ImportantNotes from "./components/ImportantNotes";
import TrackSteps from "./components/TrackSteps";
import TrackSleep from "./components/TrackSleep";
import Toaster from "./components/Toaster";
import {
  BG_VIDEO_PATH_1,
  BG_VIDEO_PATH_2,
  BG_VIDEO_PATH_3,
  BG_VIDEOS_OBJ,
} from "./constants";
import "./App.css";
function App() {
  const [bgVideo, setBgVideo] = useState(BG_VIDEO_PATH_2);

  useEffect(() => {
    let pickBgRandomly = setInterval(() => {
      let randomNumber = Math.floor((Math.random() * 10) / 4 + 1);
      let selectedBgVideo = BG_VIDEOS_OBJ[randomNumber]
      setBgVideo(selectedBgVideo);
    }, 20000);

    return () => {
      clearInterval(pickBgRandomly);
    };
  }, []);

  return (
    <div className="App">
      <video key={bgVideo} autoPlay loop muted className="bg-vid">
        <source src={bgVideo} type="video/mp4" />
      </video>
      <Grid container>
        <Grid xs={0} md={3}></Grid>
        <Grid xs={12} md={6}>
          <Header />
          <Outlet />
        </Grid>
        <Grid xs={0} md={3}></Grid>
      </Grid>

      <Toaster />
    </div>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/today_workout", element: <TrackWorkout /> },
      { path: "/today_meals", element: <TrackMeals /> },
      { path: "/imp_notes", element: <ImportantNotes /> },
      { path: "/today_steps", element: <TrackSteps /> },
      { path: "/today_sleep", element: <TrackSleep /> },
    ],
  },
]);

export default App;
