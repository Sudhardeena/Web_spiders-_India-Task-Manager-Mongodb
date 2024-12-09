const Task = require('../models/Task') //Task model
const {HttpError} = require('../middlewares/errorHandler') //Custom Error Constructor class

// exports.test = (req,res) => {
//     res.send('Task routes are working Properly!')
// }

//Task Creation Feature
exports.createTask = async (req, res, next) => {
    try{
        const {_id} = req.user //Getting user id from authenticated user 
        const task = new Task({
            ...req.body,
            owner: _id      //Providing user id as owner to keep trap user tasks
        })
        await task.save()
        
        const taskWithoutIsDeleted = task.toObject();  // Convert Mongoose document to plain object for isDeleted key deletion
        delete taskWithoutIsDeleted.isDeleted;
        res.status(201).json({task: taskWithoutIsDeleted, message: "Task Created Successfully"})

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
            owner: _id
        }

        if(status){
            query.status = status //Only added to query If presented in query params
        }

        if(priority){
            query.priority = priority  //Only added to query If presented in query params
        }

        const tasks = await Task.find(query)
            .sort(sortBy)
            .skip(offset)
            .limit(limit)
            .select('-isDeleted')  //Skiping the isDeleted field from sending to user
        

        const count = tasks.length  
        let message = "Tasks Fetched Successfully"

        if(count===0){
            message = "No Tasks Found Add Some" //Custom message of empty tasks array
        }

        res.status(200).json({
            tasks,
            count,  //based on the counts in frontend can build logic for next page
            message
        })

    }catch(err){
        next(err) //Passing error to error handling middleware
    }
}

//Get users single task by Id
exports.GetSingleTask = async (req, res, next) => {
    try{
        const taskId = req.params.id  //Geting task Id from path parameter
        const task = await Task.findOne({
            _id: taskId,
            owner: req.user._id,  //Task should match the owner with this value
            isDeleted: false
        }).select('-isDeleted')  //Skiping the isDeleted field from sending to user

        if(!task){
            throw new HttpError(404, 'Task Not Found or Might be deleted')  //Throwing custom Error code with message
        }

        res.status(200).json(task) //Sending Task as result

    }catch(err){
        next(err)  //Passing error to error handling middleware
    }
}

//Updating the Task using task id
exports.updateSingleTask = async (req, res, next) => {
    try{
        const taskId = req.params.id    //Geting task Id from path parameter
        const task = await Task.findOne({
            _id: taskId,
            owner: req.user._id     //Task should match the owner with this value
        }).select('-isDeleted')  //Skiping the isDeleted field from sending to user

        if(!task){
            throw new HttpError(404, 'Task your trying to update is not found')  //Throwing custom Error code with message
        }

        const allowedUpdateFields = ['title', 'description', 'status', 'priority', 'dueDate']  //Restricted fields to update tasks
        const updateFieldsFromRequestBody = Object.keys(req.body)

        updateFieldsFromRequestBody.forEach(each=> {
            if(allowedUpdateFields.includes(each)){  //Updating Only presented fields in request body
                task[each] = req.body[each]
            }
        })

        await task.save();


        res.status(201).json({task, message: 'Updated the task successfully'})  //Sending updated task with success message

    }catch(err){
        next(err)
    }
}

//Soft Deleting single task by setting isDeleted Field to true
exports.deleteSingleTask = async (req, res, next) => {
    try{
        const taskId = req.params.id    //Geting task Id from path parameter
        const task = await Task.findOne({
            _id: taskId,
            owner: req.user._id,   //Task should match the owner with this value
        }).select('-isDeleted')  //Skiping the isDeleted field from sending to user

        if(!task){
            throw new HttpError(404, 'Task your trying to Delete is not exits')  //Throwing custom Error code with message
        }

        if(task.isDeleted === true){ //Enables Only able to delete if isDelete is false
            throw new HttpError(400, 'Task your trying to Delete is already Deleted')
        }

        task['isDeleted'] = true  //Executing soft deletion by changing status of isDeleted field
        await task.save();


        res.status(204).json({message: 'Updated the task successfully'}) //Sucess message

    }catch(err){
        next(err)
    }
}

//Restoring soft deleted task
exports.restoreTask = async (req, res, next) => {
    try{
        const taskId = req.params.id    //Geting task Id from path parameter
        const task = await Task.findOne({
            _id: taskId,
            owner: req.user._id,  //Task should match the owner with this value
        }).select('-isDeleted')  //Skiping the isDeleted field from sending to user

        if(!task){
            throw new HttpError(404, 'Task your trying to Restore is not exists')  //Throwing custom Error code with message
        }

        if(task.isDeleted === false){ //Enables Only able to Restore if isDelete is true
            throw new HttpError(400, 'Task your trying to Delete is Not Deleted')
        }

        task['isDeleted'] = false //Restoring soft deleted task by changing status of isDeleted field 
        await task.save();


        res.status(201).json({task, message: 'Restored the task successfully'})

    }catch(err){
        next(err)
    }
}