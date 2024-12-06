const express = require('express')
const User = require('../models/User')
const {register,login} = require('../controllers/userControllers')

const router = express.Router();


router.post('/register', register)
router.get('/login', login)


module.exports = router;