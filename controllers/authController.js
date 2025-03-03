const User = require("../models/user"); //Mengimpor model pengguna dari folder models/user; folder ini mungkin memiliki kemampuan untuk menyimpan dan mengambil data pengguna.
const { generateToken } = require("../config/auth"); //Untuk membuat token autentikasi, impor fungsi dari config/auth, mungkin menggunakan JWT (JSON Web Token).
const bcrypt = require("bcryptjs"); //Library untuk menghahash kata sandi dan membandingkannya dengan hash yang tersimpan.

const authController = {
  register: async (req, res) => { //Untuk registrasi pengguna baru.
    const { username, password } = req.body;
    try {
      const userId = await User.create(username, password);
      const token = generateToken(userId);
      res.status(201).json({ token });
    } catch (err) {
      res.status(500).json({ message: "Registration failed" });
    }
  },
  login: async (req, res) => { //Untuk masuk sebagai pengguna.
    const { username, password } = req.body;
    try {
      const user = await User.findByUsername(username);
      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      const token = generateToken(user.id);
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: "Login failed" });
    }
  },
};

module.exports = authController; //Mengekspor authController agar dapat digunakan dalam file lain (misalnya dalam route autentikasi).
