const Task = require('../models/Task')
const {HttpError} = require('../middlewares/errorHandler')

// exports.test = (req,res) => {
//     res.send('Task routes are working Properly!')
// }

//Task Creation Feature
exports.createTask = async (req, res, next) => {
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
        next(err)
    }
}

//Get User Tasks Feature
exports.GetUserTasks = async (req, res, next) => {
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

        res.status(200).json({
            tasks,
            count,
            message
        })

    }catch(err){
        next(err)
    }
}

//Get users single task by Id
exports.GetSingleTask = async (req, res, next) => {
    try{
        const taskId = req.params.id
        const task = await Task.findOne({
            _id: taskId,
            owner: req.user._id,
            isDeleted: false
        }).select('-isDeleted')

        if(!task){
            throw new HttpError(404, 'Task Not Found or Might be deleted')
        }

        res.status(200).json(task)

    }catch(err){
        next(err)
    }
}

//Updating the Task using task id
exports.updateSingleTask = async (req, res, next) => {
    try{
        const taskId = req.params.id
        const task = await Task.findOne({
            _id: taskId,
            owner: req.user._id
        }).select('-isDeleted')

        if(!task){
            throw new HttpError(404, 'Task your trying to update is not found')
        }

        const allowedUpdateFields = ['title', 'description', 'status', 'priority', 'dueDate']
        const updateFieldsFromRequestBody = Object.keys(req.body)

        updateFieldsFromRequestBody.forEach(each=> {
            if(allowedUpdateFields.includes(each)){
                task[each] = req.body[each]
            }
        })

        await task.save();


        res.status(201).json({task, message: 'Updated the task successfully'})

    }catch(err){
        next(err)
    }
}

//Soft Deleting single task by setting isDeleted Field to true
exports.deleteSingleTask = async (req, res, next) => {
    try{
        const taskId = req.params.id
        const task = await Task.findOne({
            _id: taskId,
            owner: req.user._id
        }).select('-isDeleted')

        if(!task){
            throw new HttpError(404, 'Task your trying to Delete is not found')
        }

        task['isDeleted'] = true
        await task.save();


        res.status(204).json({message: 'Updated the task successfully'})

    }catch(err){
        next(err)
    }
}

//Restoring soft deleted task
exports.restoreTask = async (req, res, next) => {
    try{
        const taskId = req.params.id
        const task = await Task.findOne({
            _id: taskId,
            owner: req.user._id
        }).select('-isDeleted')

        if(!task){
            throw new HttpError(404, 'Task your trying to Restore is not exists')
        }

        task['isDeleted'] = false
        await task.save();


        res.status(201).json({task, message: 'Restored the task successfully'})

    }catch(err){
        next(err)
    }
}