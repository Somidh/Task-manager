import { FormEvent, useState } from "react";

import axios from "axios";

type TaskFormProps = {
  onTaskAdded: () => void; // Callback function to be called after adding a task
};

const TaskForm = ({ onTaskAdded }: TaskFormProps) => {
  const URL = import.meta.env.VITE_APP_URL;

  const [name, SetName] = useState<string>("");
  const [taskAdded, setTaskAdded] = useState<boolean>();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await axios.post(`${URL}/tasks`, { name });
      console.log("Task added succesfully");
      setTaskAdded(true);
      onTaskAdded();
      // dispatch(fetchTasks());
      SetName("");
    } catch (error) {
      console.log(error);
      setTaskAdded(false);
    }
  }

  return (
    <form
      className="bg-slate-200 w-[35em] rounded-md flex flex-col items-center justify-center p-12 "
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="w-full ">
        <h1 className="text-gray-800 mb-8">Task Manager</h1>
        <div className="flex items-stretch w-full justify-center gap-1">
          <input
            type="text"
            name="name"
            value={name}
            className="outline-none focus:outline-none px-4 w-full rounded-md"
            placeholder="eg. wash dishes"
            autoFocus
            onChange={(e) => SetName(e.target.value)}
          />
          <button type="submit" className="py-2 px-4 bg-blue-400 rounded-md">
            Submit
          </button>
        </div>
        {taskAdded && <p className="text-green-400">Task Added Successfully</p>}
        {taskAdded === false && (
          <p className="text-red-500">Task adding failed, Please try again</p>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
