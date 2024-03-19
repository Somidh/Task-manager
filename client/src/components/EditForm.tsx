import React, { FormEvent, useState } from "react";

import axios from "axios";
import { fetchTasks } from "../redux/features/taskAPISlice";
import { useAppDispatch } from "../redux/hooks";

type EditFormProp = {
  id: string;
  value: string;
  setEditTask: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditForm = ({ id, value, setEditTask }: EditFormProp) => {
  const [name, SetName] = useState<string>(value);
  const dispatch = useAppDispatch();

  console.log({ name });
  const URL = import.meta.env.VITE_APP_URL;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await axios.patch(`${URL}/tasks/${id}`, { name });
      setEditTask(false);
      dispatch(fetchTasks());
      console.log("Task updated succesfully");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form
      className="bg-slate-300 rounded-md flex items-center justify-between px-10 py-5 "
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="w-full ">
        <div className="flex items-stretch w-full justify-center gap-1">
          <input
            type="text"
            name="name"
            className="outline-none focus:outline-none px-4 w-full rounded-md"
            placeholder="eg. wash dishes"
            autoFocus
            onChange={(e) => SetName(e.target.value)}
            defaultValue={name}
          />
          <button type="submit" className="py-2 px-4 bg-blue-400 rounded-md">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditForm;
