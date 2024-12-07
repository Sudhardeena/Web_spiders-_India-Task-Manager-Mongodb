const express = require('express')
// const User = require('../models/User')
const {test} = require('../controllers/taskControllers')
const authenticateToken = require('../middlewares/authenticateToken')
const {createTask} = require('../controllers/taskControllers')

const router = express.Router();


router.get('/', authenticateToken, test)
router.post('/create-task', authenticateToken, createTask)


module.exports = router;