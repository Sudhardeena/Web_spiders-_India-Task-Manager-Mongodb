const mongoose = require('mongoose')
const {Schema, model} = mongoose

const  taskSchema = new Schema({
    title: { 
        type: String, 
        required: [true, 'title field value is required'], //custom error message for missing field
        max: [100, 'total characters of title should be less than or equal to 100'] //Restricting to maximum 100 chrs
    },
    description: String,
    status: {
        type: String,
        enum: {
            values : ['TODO', 'IN_PROGRESS', 'COMPLETED'],  //Restricting the acceptable values
            message: `status should be among ['TODO', 'IN_PROGRESS', 'COMPLETED']` //Custom error message
        },
        default: 'TODO'
    },
    priority: {
        type: String,
        enum: {
            values : ['LOW', 'MEDIUM', 'HIGH'],  //Restricting the acceptable values
            message: `priority should be among ['LOW', 'MEDIUM', 'HIGH']`  //Custom error message
        },
    },
    dueDate: Date,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'owner Id is required'],  //custom error message for missing field
        ref: 'User'  //providing reference of User model
    },
    isDeleted: { type: Boolean, default: false }
}, {timestamps: true})  //creates timestamps with fields 'createdAt', 'updatedAt'

const Task = model('Task', taskSchema)   //Model creation for task schema

module.exports = Task  //Exporting model for database CURD operations

