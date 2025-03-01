const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    category: String,
    deadline: Date,
    status: String,
    userId: mongoose.Schema.Types.ObjectId
});

const taskModel = mongoose.model('tasks', taskSchema);

const Task = {
    create: async (title, category, deadline, status, userId) => {
        let task = new taskModel({
            title, category, deadline, status, userId
        });
        task = await task.save();
        return task._id;
    },
    findAllByUserId: async (userId) => {
        return taskModel.find({
            userId: userId
        }).exec();
    },
    update: async (taskId, title, category, deadline, status) => {
        return taskModel.findByIdAndUpdate(taskId, {
            $set: {
                title, category, deadline, status
            }
        }, {
            returnDocument: "after"
        }).exec()
    },
    delete: async (taskId) => {
        return taskModel.findByIdAndDelete(taskId).exec();
    },
};
  
module.exports = Task;