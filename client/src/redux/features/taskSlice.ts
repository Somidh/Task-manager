import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TTask } from "../../types";

type TaskState = {
  tasks: TTask[];
};

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addStateTask: (state, action: PayloadAction<TTask>) => {
      console.log("Task added 2");
      state.tasks.push(action.payload);
    },
    updateStateTask: (state, action: PayloadAction<TTask>) => {
      const { _id, name } = action.payload;
      const existingTask = state.tasks.find((task) => task._id === _id);

      if (existingTask) {
        existingTask.name = name;
      }
    },
    deleteStateTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
  },
});

export const { addStateTask, updateStateTask, deleteStateTask } =
  taskSlice.actions;
export default taskSlice.reducer;
