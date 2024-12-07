const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const {HttpError} = require('../middlewares/errorHandler')


// exports.test = (req,res) => {
//     res.send('User routes are working Properly!')
// }

exports.register = async (req, res, next) => {
    try{
        const {username, email, password} = req.body
        // console.log(req.body)
        const isUserExists = await User.exists({username})
        if(isUserExists){
            throw new HttpError(401, 'User already exists')
        }

        const isEmailExists = await User.exists({email})
        if(isEmailExists){
            throw new HttpError(401, 'email already associated with an account')
        }

        const user = new User({ username, email, password })
        await user.save()
        res.status(201).json({ message: 'User Created Successfully'})
    }catch(err){
        next(err)
        // console.log(err)
    }
}

exports.login = async (req, res, next) => {
    try{
        const {username,password} = req.body
        const user = await User.findOne({username})

        if(!user){
            throw new HttpError(404, "Unable to login, User not found")
        }
        
        // console.log(user)
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            throw new HttpError(401, "Invalid password")
        }

        const jwt_token = jwt.sign( {_id: user._id.toString() }, process.env.JWT_SECRET_KEY)
        res.status(200).json({jwt_token, message: "Logged in successfully"})

    }catch(err){
        // console.log(err)
        next(err)
    }
}