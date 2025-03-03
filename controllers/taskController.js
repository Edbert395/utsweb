const Task = require("../models/task"); //Untuk berinteraksi dengan database dengan melakukan tugas seperti membuat, membaca, memperbarui, dan menghapus.

const taskController = { //Objek yang mencakup berbagai fungsi (metode) yang digunakan untuk menangani berbagai operasi tugas.
  createTask: async (req, res) => { //Tugas baru.
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
  getTasks: async (req, res) => { //Memperoleh semua tugas milik pengguna.
    const userId = req.user.id;
    try {
      const tasks = await Task.findAllByUserId(userId);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  },
  updateTask: async (req, res) => { //Mengubah tugas.
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
  deleteTask: async (req, res) => { //Menghapus Tugas.
    const { id } = req.params;
    try {
      await Task.delete(id);
      res.json({ message: "Task deleted" });
    } catch (err) {
      res.status(500).json({ message: "Task deletion failed" });
    }
  },
};

module.exports = taskController; //Mengekspor taskController untuk digunakan dalam rute atau file aplikasi lainnya.
