const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");

// Getting all tasks
const getAllTasks = asyncWrapper(async (req, res) => {
  const task = await Task.find({});
  res.status(200).json({ task });
});

// Creating task
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// Getting single task
const getSingleTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    return res.status(404).json({ msg: `No task found with id: ${taskId}` });
  }

  res.status(200).json({ task });
});

// Updating a task
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.updateOne({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return res.status(404).json({ msg: `No task found with id: ${taskId}` });
  }

  res.status(200).json({ task });
});

// Deleting a task
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.deleteOne({ _id: taskId });

  if (!task) {
    return res.status(404).json({ msg: `No task found with id: ${taskId}` });
  }

  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
