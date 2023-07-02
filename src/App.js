import { Grid, Typography } from "@mui/material";
import Home from "./components/Home";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import TrackWorkout from "./components/TrackWorkout";
import TrackMeals from "./components/TrackMeals";
import ImportantNotes from "./components/ImportantNotes";
import TrackSteps from "./components/TrackSteps";
import TrackSummary from "./components/TrackSummary";
import TrackSleep from "./components/TrackSleep";
import Toaster from "./components/Toaster";
function App() {
  return (
    <div className="App">
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
      path:"/",
      element:<App />,
      children:[
        {path:"/", element:<Home />},
        {path:"/today_workout", element:<TrackWorkout />},
        {path:"/today_meals", element:<TrackMeals />},
        {path:"/imp_notes", element:<ImportantNotes />},
        {path:"/today_steps", element:<TrackSteps />},
        // {path:"/today_summary" , element:<TrackSummary />},
        {path:"/today_sleep" , element:<TrackSleep />}
      ]
}])

export default App;
