require('dotenv').config() // https://github.com/motdotla/dotenv
const mongoose = require('mongoose');
const express = require('express');
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

mongoose.connect(process.env.MONGODB);
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/todo", async (req, res) => {
    res.render("todo");
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
