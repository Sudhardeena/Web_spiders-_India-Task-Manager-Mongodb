const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')


exports.test = (req,res) => {
    res.send('User routes are working Properly!')
}

exports.register = async (req,res) => {
    try{
        const {username, email, password} = req.body
        // console.log(req.body)
        const user = new User({username, email, password})
        await user.save()
        res.status(201).send({ user, message: 'User Created Successfully'})
    }catch(err){
        res.status(400).send({error:err})
        // console.log(err)
    }
}

exports.login = (req,res) => {
    res.send('login working Properly!')
}