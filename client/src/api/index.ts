import axios from "axios";

const URL = import.meta.env.VITE_APP_URL;

export const createTask = async (name: string) => {
  try {
    const res = await axios.post(`${URL}/tasks`, { name });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id: string) => {
  try {
    const res = await axios.delete(`${URL}/tasks/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (
  id: string,
  name: string,
  completed: boolean
) => {
  try {
    await axios.patch(`${URL}/tasks/${id}`, { name, completed });
  } catch (error) {
    console.log(error);
  }
};
