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
  return await axios.get(`${URL}/tasks`).then((response) => {
    const { task } = response.data;
    return task;
  });
});

const taskSlice = createSlice({
  name: "task",
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

// export const selectAllTasks = (state: RootState) => state.task.tasks;
export default taskSlice.reducer;
// export const { setTasks } = taskSlice.actions;
