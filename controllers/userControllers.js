const bcrypt = require('bcrypt') //package for password encryption
const jwt = require('jsonwebtoken')
const User = require('../models/User')  //User model
const {HttpError} = require('../middlewares/errorHandler')  //Custom Error Constructor class


// exports.test = (req,res) => {
//     res.send('User routes are working Properly!')
// }

exports.register = async (req, res, next) => {
    try{
        const {username, email, password} = req.body
        // console.log(req.body)
        const isUserExists = await User.exists({username})  //Checking Username already presented in collection
        if(isUserExists){
            throw new HttpError(401, 'User already exists') //Throwing error if username exists
        }

        const isEmailExists = await User.exists({email})  //Checking email already presented in collection
        if(isEmailExists){
            throw new HttpError(401, 'email already associated with an account')  //Throwing error if email exists
        }

        const user = new User({ username, email, password })
        await user.save()

        res.status(201).json({ message: 'User Created Successfully'}) //Sending Success message

    }catch(err){
        next(err) //Passing error to erro handling middleware
        // console.log(err)
    }
}

exports.login = async (req, res, next) => {
    try{
        const {username,password} = req.body
        const user = await User.findOne({username})

        if(!user){
            throw new HttpError(404, "Unable to login, User not found") //Throwing error if usermame doesn't exists in User collection
        }
        
        // console.log(user)
        const isMatch = await bcrypt.compare(password, user.password) //Comparing the provided and password and encrypted password sotred in collection
        if(!isMatch){
            throw new HttpError(401, "Invalid password")  //if doesn't match throws error
        }
        // console.log(user._id.toString())
        const jwt_token = jwt.sign( {_id: user._id.toString() }, process.env.JWT_SECRET_KEY)  //if matched generating jwt token
        res.status(200).json({jwt_token, message: "Logged in successfully"}) //send jwt token with success message

    }catch(err){
        // console.log(err)
        next(err)
    }
}