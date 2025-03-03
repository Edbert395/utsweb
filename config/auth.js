const jwt = require("jsonwebtoken"); //Mengimpor repository jsonwebtoken, yang digunakan untuk membuat dan memverifikasi token JWT.
require("dotenv").config(); //Variabel lingkungan harus dimuat ke dalam file.env agar nilai seperti JWT_SECRET dapat digunakan.

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
}; //Membuat token JWT untuk autentikasi pengguna.

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}; //Mengecek token JWT yang dikirim pengguna.

module.exports = { generateToken, verifyToken }; //mengekspor fungsi yang menghasilkan dan memverifikasi token agar token dapat digunakan di file lain dalam aplikasi Node.js.
