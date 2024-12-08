const express = require('express')
const authenticateToken = require('../middlewares/authenticateToken') //jwt token authentication middleware
const {
    createTask, 
    GetUserTasks, 
    GetSingleTask,
    updateSingleTask,
    deleteSingleTask,
    restoreTask
} = require('../controllers/taskControllers') //Controllers for routes
const {
    joiTaskQueryParameterValidater, 
    joiTaskInputValidater
} = require('../middlewares/joiInputValidater') //Middlewares for Input validation by JOI

const router = express.Router();


router.post('/', authenticateToken, joiTaskInputValidater, createTask) //joi input validation middleware included
router.get('/', authenticateToken, joiTaskQueryParameterValidater, GetUserTasks)//joi Query parameter validation middleware included
router.get('/:id', authenticateToken, GetSingleTask)
router.put('/:id', authenticateToken, joiTaskInputValidater, updateSingleTask) //joi input validation middleware included
router.delete('/:id', authenticateToken, deleteSingleTask)
router.patch('/:id', authenticateToken, restoreTask)


module.exports = router;