import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userDetails/userSlice.js";
export const store = configureStore({
    reducer:{
        user:userReducer
    }
})