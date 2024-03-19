import { useAppDispatch, useAppSelector } from "../redux/hooks";

import Task from "./Task";
import TaskForm from "./TaskForm";
import { fetchTasks } from "../redux/features/taskAPISlice";
import { useEffect } from "react";

const Tasks = () => {
  const tasks = useAppSelector((state) => state.taskAPI);
  const stateTask = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [stateTask]);

  return (
    <>
      <TaskForm />
      <div className="mt-20">
        {!tasks.loading && tasks.error ? <div>Error: {tasks.error}</div> : null}
        {tasks.tasks.length ? (
          <>
            {tasks.tasks.map((task, idx) => (
              <div className="mb-6" key={idx}>
                <Task task={task} />
              </div>
            ))}
          </>
        ) : null}
        {tasks.loading && <div>Loading...</div>}
      </div>
    </>
  );
};

export default Tasks;
