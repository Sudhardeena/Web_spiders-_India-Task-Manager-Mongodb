const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')


// exports.test = (req,res) => {
//     res.send('User routes are working Properly!')
// }

exports.register = async (req,res) => {
    try{
        const {username, email, password} = req.body
        // console.log(req.body)
        const isUserExists = await User.exists({username})
        if(isUserExists){
            throw new Error('User already exists')
        }

        const isEmailExists = await User.exists({email})
        if(isEmailExists){
            throw new Error('email already associated with an account')
        }

        const user = new User({ username, email, password })
        await user.save()
        res.status(201).send({ message: 'User Created Successfully'})
    }catch(err){
        res.status(400).send({ error: err.message })
        // console.log(err)
    }
}

exports.login = async (req,res) => {
    try{
        const {username,password} = req.body
        const user = await User.findOne({username})

        if(!user){
            throw new Error("Unable to login, User not found")
        }
        
        // console.log(user)
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            throw new Error("Invalid password")
        }

        const jwt_token = jwt.sign( {_id: user._id.toString() }, process.env.JWT_SECRET_KEY)
        res.status(200).json({jwt_token, message: "Logged in successfully"})

    }catch(err){
        // console.log(err)
        res.status(400).send({error:err.message})
    }
}