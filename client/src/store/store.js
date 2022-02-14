import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth.reducer";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    }
});

export const { dispatch } = store; // Imported in apiService 

export default store;
