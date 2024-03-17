import axios from "axios";

const URL = import.meta.env.VITE_APP_URL;

export const getAllTasks = async () => {};

export const deleteTask = async (id: string) => {
  try {
    const res = await axios.delete(`${URL}/tasks/${id}`);
    console.log("TASK DELETED SUCCESFULLY");
    console.log("DELTE DATA", res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTaskComplete = async (
  id: string,
  name: string,
  completed: boolean
) => {
  try {
    await axios.patch(`${URL}/tasks/${id}`, { name, completed });

    console.log("Task changed ");
  } catch (error) {
    console.log(error);
  }
};
