const express = require('express')
const {register,login} = require('../controllers/userControllers') //Controllers for routes
const {
    joiUserRegisterInputValidater, 
    joiUserLoginInputValidater
} = require('../middlewares/joiInputValidater') //Middlewares for Input validation by JOI
const router = express.Router();


router.post('/register', joiUserRegisterInputValidater, register)// joi Input validater middleware included
router.post('/login', joiUserLoginInputValidater, login)// joi Input validater middleware included


module.exports = router;