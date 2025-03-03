require('dotenv').config() //https://github.com/motdotla/dotenv
const mongoose = require('mongoose');
const express = require('express'); //Konfigurasi server express.
const authRoutes = require("./routes/authRoutes"); //Menghubungkan autentikasi rute dan tugas.
const taskRoutes = require("./routes/taskRoutes");

mongoose.connect(process.env.MONGODB); //Menghubungkan ke mongoDB.
const port = process.env.PORT || 3000;

const app = express(); //Konfigurasi server express.
app.use(express.static("public")); //Tempat penyimpanan file statis yang mencakup CSS, gambar, dan JS frontend.
app.set("view engine", "ejs"); //Template engine yang digunakan untuk menghasilkan halaman HTML dinamis.
app.use(express.json()); //Memungkinkan Express untuk membaca request body JSON.

app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

app.get("/", (req, res) => { //Menyusun halaman utama.
    res.render("index");
})

app.get("/register", (req, res) => { //Menampilkan halaman registrasi menggunakan view/register.ejs.
    res.render("register");
})

app.get("/todo", async (req, res) => { //Menampilkan halaman daftar tugas yang menggunakan views/todo.ejs.
    res.render("todo");
})

app.listen(port, () => { //Mengoperasikan server.
  console.log(`Server running on http://localhost:${port}`);
});
