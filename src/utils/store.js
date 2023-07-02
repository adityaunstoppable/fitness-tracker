import { configureStore } from "@reduxjs/toolkit";
import dateSlice from "./dateSlice";
import todayContentSlice from "./todayContentSlice";
import toastSlice from "./toastSlice";

const store = configureStore({
    reducer:{
        date:dateSlice,
        todayContent:todayContentSlice,
        toast:toastSlice
    }
})


export default store