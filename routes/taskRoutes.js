const express = require('express')
// const User = require('../models/User')
const {test} = require('../controllers/taskControllers')
const authenticateToken = require('../middlewares/authenticateToken')

const router = express.Router();


router.get('/', authenticateToken, test)


module.exports = router;