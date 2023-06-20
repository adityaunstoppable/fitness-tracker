import { configureStore } from "@reduxjs/toolkit";
import dateSlice from "./dateSlice";

const store = configureStore({
    reducer:{
        date:dateSlice
    }
})

export default store