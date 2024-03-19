import { SquarePen, Trash2 } from "lucide-react";
import { deleteTask, updateTask } from "../api";

import EditForm from "./EditForm";
import { TTask } from "../types";
import { deleteStateTask } from "../redux/features/taskSlice";
import { fetchTasks } from "../redux/features/taskAPISlice";
import { useAppDispatch } from "../redux/hooks";
import { useState } from "react";

const Task = ({ task }: { task: TTask }) => {
  const [editTask, setEditTask] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(task.completed);
  const dispatch = useAppDispatch();
  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsChecked(event.target.checked);
    await updateTask(task._id, task.name, event.target.checked);
  };

  function handleDeleteTask() {
    deleteTask(task._id);
    dispatch(fetchTasks());
    dispatch(deleteStateTask(task._id));
  }

  return (
    <>
      {editTask ? (
        <div>
          <EditForm setEditTask={setEditTask} id={task._id} value={task.name} />
        </div>
      ) : (
        <div className="bg-gray-800 rounded-md flex items-center justify-between px-10 py-5 ">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={handleCheckboxChange}
              checked={isChecked}
            />
            <h2
              className={`text-slate-300 ${
                isChecked && "line-through text-gray-400"
              } `}
            >
              {task.name}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            {!isChecked && (
              <SquarePen
                className=" cursor-pointer"
                onClick={() => setEditTask(true)}
              />
            )}
            <Trash2
              className="text-red-600 cursor-pointer"
              onClick={handleDeleteTask}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Task;
