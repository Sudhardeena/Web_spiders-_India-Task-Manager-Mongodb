const express = require('express')
// const User = require('../models/User')
const {test} = require('../controllers/taskControllers')
const authenticateToken = require('../middlewares/authenticateToken')
const {
    createTask, 
    GetUserTasks, 
    GetSingleTask,
    updateSingleTask
} = require('../controllers/taskControllers')

const router = express.Router();


// router.get('/', authenticateToken, test)


router.post('/', authenticateToken, createTask)
router.get('/', authenticateToken, GetUserTasks)
router.get('/:id', authenticateToken, GetSingleTask)
router.put('/:id', authenticateToken, updateSingleTask)


module.exports = router;