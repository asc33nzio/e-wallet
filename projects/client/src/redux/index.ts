import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import tokenSlice from "./tokenSlice";

export const ReduxStore = configureStore({
	reducer: {
		user: userSlice,
		token: tokenSlice,
	},
});
