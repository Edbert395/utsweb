const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.index({ username:1 }, { unique: true }) // supaya username unique

const userModel = mongoose.model('users', userSchema);

const User = {
    create: async (username, password) => {
        const hashedPassword = await bcrypt.hash(password, 10); // hash password agar tidak nyimpan plain text dalam database
        let user = new userModel({
            username, password: hashedPassword
        });
        user = await user.save();
        return user._id;
    },
    findByUsername: async (username) => {
        return userModel.findOne({ username }).exec();
    }
};

module.exports = User;