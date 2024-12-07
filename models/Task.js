const mongoose = require('mongoose')
const {Schema, model} = mongoose

const  taskSchema = new Schema({
    title: { type: String, required: true, max: 100 },
    description: String,
    status: {
        type: String,
        enum: ['TODO', 'IN_PROGRESS', 'COMPLETED'],
        default: 'TODO'
    },
    priority: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
    },
    dueDate: Date,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    isDeleted: { type: Boolean, default: false }
}, {timestamps: true})

const Task = model('Task', taskSchema)

module.exports = Task

//title: String, // Required, max 100 characters 
// description: String, // Optional 
// status: String, // Enum: ['TODO', 'IN_PROGRESS', 'COMPLETED'] 
// priority: String, // Enum: ['LOW', 'MEDIUM', 'HIGH'] 
// dueDate: Date, // Optional 
// createdAt: Date, 
// updatedAt: Date 
