const mongoose = require('mongoose')
const {Schema,model} = mongoose
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

//this is a middleware will be executed before saving
userSchema.pre('save', async function(next){
    const user = this;
    // console.log(user)
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

const User = model('User', userSchema);
module.exports = User