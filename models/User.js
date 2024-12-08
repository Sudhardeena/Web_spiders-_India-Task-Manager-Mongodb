const mongoose = require('mongoose')
const {Schema,model} = mongoose
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        type: String, 
        required: [true, 'username field value is required'],  //custom error message for missing field
        unique: [true, 'User already exists']  //custom error message for unique field
    },
    email: {
        type: String, 
        required: [true, 'email field value is required'],  //custom error message for missing field
        unique: [true, 'email already associated with an account']},  //custom error message for uniqe field
    password: {
        type: String, 
        required: [true, 'password field value is required']  //custom error message for missing field
    }
});

//this is a middleware will be executed before saving
userSchema.pre('save', async function(next){
    const user = this;
    // console.log(user)
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 10)  //Encrypting the password before storing to mongodb
    }
    next()
})

const User = model('User', userSchema);  //Creating User model for userSchema
module.exports = User  //Exporting model for database CURD operations