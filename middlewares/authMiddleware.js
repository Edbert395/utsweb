const { verifyToken } = require("../config/auth"); //VerifyToken diimpor dari modul auth.js yang tersedia di folder config yang digunakan untuk memverifikasi token JWT.

const authMiddleware = (req, res, next) => { //Sebelum request diproses oleh rute pengendali, middleware ini akan dipanggil.
  const token = req.header("Authorization")?.replace("Bearer ", ""); //Middleware mengambil nilai token dari header otorisasi. Jika ada token, kata kunci "Bearer" dihapus agar hanya tokennya yang tersisa.
  if (!token) return res.status(401).json({ message: "Access denied" }); //Jika request tidak mengandung token, server akan mengembalikan status 401 (Unauthorized) dengan pesan "Akses dilarang".

  try { //Mengecek token.
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) { //Mengendalikan token yang tidak valid.
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware; //Authentication middleware diekspor agar dapat digunakan di rute aplikasi lainnya.
