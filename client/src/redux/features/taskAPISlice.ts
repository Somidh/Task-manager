import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TTask } from "../../types";
import axios from "axios";

type InitialState = {
  loading: boolean;
  tasks: TTask[];
  error: string;
};

const initialState: InitialState = {
  loading: false,
  tasks: [],
  error: "",
};

const URL = import.meta.env.VITE_APP_URL;

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const res = await axios.get(`${URL}/tasks`);
  const { task } = res.data;
  console.log("Hello", task);
  console.log("Task fetching");
  return task;
});

const taskAPISlice = createSlice({
  name: "taskAPI",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchTasks.fulfilled,
      (state, action: PayloadAction<TTask[]>) => {
        state.loading = false;
        state.tasks = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.tasks = [];
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default taskAPISlice.reducer;
