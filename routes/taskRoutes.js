const express = require('express')
// const {test} = require('../controllers/taskControllers')
const authenticateToken = require('../middlewares/authenticateToken')
const {
    createTask, 
    GetUserTasks, 
    GetSingleTask,
    updateSingleTask,
    deleteSingleTask,
    restoreTask
} = require('../controllers/taskControllers')
const {joiTaskInputValidater} = require('../middlewares/joiInputValidater')

const router = express.Router();


// router.get('/', authenticateToken, test)


router.post('/', authenticateToken, joiTaskInputValidater, createTask) //joi input validation middleware included
router.get('/', authenticateToken, GetUserTasks)
router.get('/:id', authenticateToken, GetSingleTask)
router.put('/:id', authenticateToken, joiTaskInputValidater, updateSingleTask) //joi input validation middleware included
router.delete('/:id', authenticateToken, deleteSingleTask)
router.patch('/:id', authenticateToken, restoreTask)


module.exports = router;