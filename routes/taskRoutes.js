const express = require('express')
// const User = require('../models/User')
const {test} = require('../controllers/taskControllers')
const authenticateToken = require('../middlewares/authenticateToken')
const {createTask, GetUserTasks} = require('../controllers/taskControllers')

const router = express.Router();


// router.get('/', authenticateToken, test)


router.post('/', authenticateToken, createTask)
router.get('/', authenticateToken, GetUserTasks)


module.exports = router;