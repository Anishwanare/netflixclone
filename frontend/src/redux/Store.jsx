import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice" // we can give any name

export const store = configureStore({
    reducer:{
        app: userReducer,
    }
})