const Task = require('../models/Task')

// exports.test = (req,res) => {
//     res.send('Task routes are working Properly!')
// }

//Task Creation Feature
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

//Get User Tasks Feature
exports.GetUserTasks = async (req, res) => {
    try{
        const {_id} = req.user
        const status = req.query.status || null
        const priority = req.query.priority || null
        const sortBy = req.query.sort || 'createdAt'
        const page = req.query.page || 1
        const limit = 2 
        const offset = (page-1)*limit
        
        // console.log(status,priority,sortBy,offset,limit)

        const query = {
            owner: _id,
            isDeleted: false
        }

        if(status){
            query.status = status
        }

        if(priority){
            query.priority = priority
        }

        const tasks = await Task.find(query)
            .sort(sortBy)
            .skip(offset)
            .limit(limit)
            .select('-isDeleted')
        

        const count = tasks.length
        let message = "Tasks Fetched Successfully"

        if(count===0){
            message = "No Tasks Found Add Some"
        }

        res.status(201).json({
            tasks,
            count,
            message
        })

    }catch(err){
        res.status(401).json({message: err.message})
    }
}

//Get users single task by Id
exports.GetSingleTask = async (req, res) => {
    try{
        const taskId = req.params.id
        const task = await Task.findOne({
            _id: taskId,
            owner: req.user._id
        }).select('-isDeleted')

        if(!task){
            throw new Error('Task Not Found')
        }

        res.status(201).json(task)

    }catch(err){
        res.status(401).json({message: err.message})
    }
}