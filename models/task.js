const mongoose = require('mongoose'); //Menghubungkan dan mengelola data MongoDB dengan mengimpor library Mongoose.

const taskSchema = new mongoose.Schema({ //Membuat skema tugas, yang menunjukkan bagaimana koleksi tugas dilakukan dalam database MongoDB.
    title: String,
    category: String,
    deadline: Date,
    status: String,
    userId: mongoose.Schema.Types.ObjectId
});

const taskModel = mongoose.model('tasks', taskSchema); //Membuat model tugas yanng terhubung ke koleksi tugas dalam database MongoDB dan memungkinkan berinteraksi dengan data tugas.

const Task = {
    create: async (title, category, deadline, status, userId) => { //Memperkenalkan tugas baru.
        let task = new taskModel({
            title, category, deadline, status, userId
        });
        task = await task.save();
        return task._id;
    },
    findAllByUserId: async (userId) => { //Menampilkan semua tugas sesuai dengan ID Pengguna.
        return taskModel.find({
            userId: userId
        }).exec();
    },
    update: async (taskId, title, category, deadline, status) => { //Perbarui tugas berdasarkan identitas.
        return taskModel.findByIdAndUpdate(taskId, {
            $set: {
                title, category, deadline, status
            }
        }, {
            returnDocument: "after"
        }).exec()
    },
    delete: async (taskId) => { //Menghapus tugas yang berdasarkan identitas.
        return taskModel.findByIdAndDelete(taskId).exec();
    },
};
  
module.exports = Task; //Mengekspor objek Tugas untuk digunakan di file aplikasi lainnya.