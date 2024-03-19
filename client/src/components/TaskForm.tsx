import { FormEvent, useState } from "react";

import { addStateTask } from "../redux/features/taskSlice";
import { createTask } from "../api";
import { fetchTasks } from "../redux/features/taskAPISlice";
import { useAppDispatch } from "../redux/hooks";

const TaskForm = () => {
  const [name, SetName] = useState<string>("");
  const [taskAdded, setTaskAdded] = useState<boolean>();
  const dispatch = useAppDispatch();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createTask(name);
    dispatch(addStateTask({ _id: "", name, completed: false }));
    setTaskAdded(true);
    SetName("");
    dispatch(fetchTasks());
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
