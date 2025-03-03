const mongoose = require("mongoose"); //Untuk berinteraksi dengan MongoDB database.
const bcrypt = require("bcryptjs"); //Untuk mengamankan password dengan meng-hashnya.

const userSchema = new mongoose.Schema({ //Membuat schema pengguna.
    username: String,
    password: String
});

userSchema.index({ username:1 }, { unique: true }) //Membuat index unik untuk nama pengguna.

const userModel = mongoose.model('users', userSchema); //Konstruksi Model Mongoose.

const User = { //Untuk mengelola aktivitas database.
    create: async (username, password) => { //Membuat pengguna baru.
        const hashedPassword = await bcrypt.hash(password, 10); //Hash password agar tidak nyimpan plain text dalam database.
        let user = new userModel({
            username, password: hashedPassword
        });
        user = await user.save();
        return user._id;
    },
    findByUsername: async (username) => { //Mencari orang berdasarkan nama pengguna.
        return userModel.findOne({ username }).exec();
    }
};

module.exports = User; //Mengekspor objek user, yang memungkinkan penggunaan di file lain yang membutuhkan fungsi create dan findByUsername.