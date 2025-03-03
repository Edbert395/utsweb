const express = require("express"); //Mengimpor modul Express.js untuk digunakan dalam pembuatan router.
const authController = require("../controllers/authController"); //Mengimpor authController dari file authController.js yang terletak dalam folder controllers yang dimana memiliki fungsi-fungsi yang menangani autentikasi, seperti registrasi dan login.

const router = express.Router(); //Membuat instance express.Router(), yang digunakan untuk membuat rute atau endpoint HTTP.

router.post("/register", authController.register); //Mengatur proses login dan registrasi.
router.post("/login", authController.login);

module.exports = router; //Membuat router tersedia untuk digunakan di file lain, biasanya app.js atau server.js.
