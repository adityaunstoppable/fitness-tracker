import { createSlice } from "@reduxjs/toolkit";

const todayContentSlice = createSlice({
  name: "todayContentSlice",
  initialState: { date: "", exercises: [], sleep: "", meals: [], steps: "" , impNotes:"" },
  reducers: {
    setTodayDate(state, action) {
      state["date"] = action.payload.todayDate;
    },
    setTodayExercises(state, action) {
      state.exercises = [...state.exercises , action.payload]
    },
    setTodayExericeSets(state , action){
        state.exercises = state.exercises?.map(eachEx => {
            if(eachEx.name === action.payload.exerciseName){
                eachEx.sets.push({[`Set${action.payload.setNum}`]:action.payload.setString})
            }
            return eachEx
        })
    },
    setTodayExerciseNotes(state ,action){
        state.exercises = state.exercises?.map(eachEx => {
            if(eachEx.name === action.payload.exerciseName){
                eachEx.notes = action.payload.impNotesString
            }
            return eachEx
        })
    },
    setTodaySteps(state, action) {
      state.steps = action.payload
    },
    setTodaySleeps(state, action) {
      state.sleep = action.payload
    },
    setTodayMeals(state, action) {
    },
    setTodayImportantNotes(state, action) {
      state.impNotes = action.payload
    },
   
  },
});

export const {
  setTodayDate,
  setTodayExercises,
  setTodaySteps,
  setTodaySleeps,
  setTodayMeals,
  setTodayImportantNotes,
  setTodayExericeSets,
  setTodayExerciseNotes
} = todayContentSlice.actions;

export default todayContentSlice.reducer;
