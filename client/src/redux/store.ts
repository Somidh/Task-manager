import { configureStore } from "@reduxjs/toolkit";
import taskAPIReducer from "./features/taskAPISlice";
import taskReducer from "./features/taskSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    taskAPI: taskAPIReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
