const express = require('express')
const User = require('../models/User')
const {test} = require('../controllers/userControllers')

const router = express.Router();


router.get('/', test)


module.exports = router;