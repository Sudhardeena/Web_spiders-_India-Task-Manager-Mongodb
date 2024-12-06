const express = require('express')
// const User = require('../models/User')
const {test} = require('../controllers/taskControllers')

const router = express.Router();


router.get('/', test)


module.exports = router;