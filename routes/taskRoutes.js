const express = require("express"); //Import modul yang dibutuhkan.
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router(); //Untuk membuat router yang berbeda yang bertanggung jawab atas endpoint tugas yang terkait.

router.use(authMiddleware); //Sebelum diproses lebih lanjut, setiap rute di router ini akan melalui middleware autentikasi.

router.post("/tasks", taskController.createTask); //Untuk membuat tugas baru, gunakan fungsi createTask.
router.get("/tasks", taskController.getTasks); //Menjalankan fungsi getTasks untuk mendapatkan daftar pekerjaan.
router.put("/tasks/:id", taskController.updateTask); //Menjalankan fungsi updateTask untuk memperbarui tugas sesuai dengan identitas.
router.delete("/tasks/:id", taskController.deleteTask); //Menghapus tugas berdasarkan identitas dengan menjalankan fungsi deleteTask.

module.exports = router; //Mengekspor router sehingga dapat digunakan di file tambahan, biasanya app.js atau server.js.
