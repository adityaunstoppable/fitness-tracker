import { configureStore } from "@reduxjs/toolkit";
import dateSlice from "./dateSlice";
import todayContentSlice from "./todayContentSlice";

const store = configureStore({
    reducer:{
        date:dateSlice,
        todayContent:todayContentSlice
    }
})

export default store