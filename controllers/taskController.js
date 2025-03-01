const Task = require("../models/task");

const taskController = {
  createTask: async (req, res) => {
    const { title, category, deadline, status } = req.body;
    const userId = req.user.id;
    try {
      const taskId = await Task.create(title, category, deadline, status, userId);
      res.status(201).json({ taskId });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Task creation failed" });
    }
  },
  getTasks: async (req, res) => {
    const userId = req.user.id;
    try {
      const tasks = await Task.findAllByUserId(userId);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  },
  updateTask: async (req, res) => {
    const { id } = req.params;
    const { title, category, deadline, status } = req.body;
    try {
      const updatedTask = await Task.update(id, title, category, deadline, status);
      if (updatedTask) {
        res.json({ message: "Task updated" });
      } else {
        res.json({ message: "Task not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Task update failed" });
    }
  },
  deleteTask: async (req, res) => {
    const { id } = req.params;
    try {
      await Task.delete(id);
      res.json({ message: "Task deleted" });
    } catch (err) {
      res.status(500).json({ message: "Task deletion failed" });
    }
  },
};

module.exports = taskController;
