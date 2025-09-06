// controllers/taskController.js
import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: 'Task title is required' });
  
  const task = await Task.create({ user: req.user._id, title });
  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(tasks);
};

export const updateTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task not found' });

  task.title = req.body.title || task.title;
  task.completed = req.body.completed ?? task.completed;

  const updated = await task.save();
  res.status(200).json(updated);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.status(200).json({ message: 'Task deleted successfully' });
};
