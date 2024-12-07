const Task = require('../models/Task')

exports.test = (req,res) => {
    res.send('Task routes are working Properly!')
}

exports.createTask = async (req,res) => {
    try{
        const {_id} = req.user
        const task = new Task({
            ...req.body,
            owner: _id
        })
        await task.save()
        
        const taskWithoutIsDeleted = task.toObject();  // Convert Mongoose document to plain object
        delete taskWithoutIsDeleted.isDeleted;
        res.status(201).json({taskWithoutIsDeleted, message: "Task Created Successfully"})

    }catch(err){
        res.status(401).json({message: err.message})
    }
}