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

const router = express.Router();


// router.get('/', authenticateToken, test)


router.post('/', authenticateToken, createTask)
router.get('/', authenticateToken, GetUserTasks)
router.get('/:id', authenticateToken, GetSingleTask)
router.put('/:id', authenticateToken, updateSingleTask)
router.delete('/:id', authenticateToken, deleteSingleTask)
router.patch('/:id', authenticateToken, restoreTask)


module.exports = router;