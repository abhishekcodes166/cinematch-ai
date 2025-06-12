
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Userslice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default appStore;
