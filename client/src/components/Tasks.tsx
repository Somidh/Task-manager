import { useAppDispatch, useAppSelector } from "../redux/hooks";

import Task from "./Task";
import TaskForm from "./TaskForm";
import { fetchTasks } from "../redux/features/taskSlice";
import { useEffect } from "react";

const Tasks = () => {
  const dispatch = useAppDispatch();
  const task = useAppSelector((state) => state.task);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  function handleTaskAdded() {
    dispatch(fetchTasks());
  }

  return (
    <div>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <div className="mt-20">
        {task.tasks.map((task, idx) => (
          <div className="mb-6" key={idx}>
            <Task task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
