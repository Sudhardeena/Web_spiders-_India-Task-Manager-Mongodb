const Joi = require('joi')

//Middleware for Joi create and Update Task API Input validation
exports.joiTaskInputValidater = (req, res, next) => {
    const taskSchema = Joi.object({
        title: Joi.string().max(100).required().messages({
            "string.empty": `"title" must contain value`,
            "any.required": `"title" field is required`
        }),
        description: Joi.string().messages({
            "string.empty": `"title" must contain value`
        }),
        status: Joi.string().valid(...['TODO', 'IN_PROGRESS', 'COMPLETED']),
        priority: Joi.string().valid(...['LOW', 'MEDIUM', 'HIGH']),
        dueDate: Joi.date(),
    }).options({ abortEarly: false });

    const {error} =  taskSchema.validate(req.body)
    
    if(error){
        // console.log(error)
        const errorMessages = error.details.map(each => each.message.replaceAll('"', "*")).join(', ')
        return res.status(400).json({error: 'Input Validation Error', message: errorMessages})
    }
    next()
}

//Middleware for Joi User Registration API Input validation
exports.joiUserRegisterInputValidater = (req, res, next) => {
    const userSchema = Joi.object({
        username: Joi.string().required().messages({
            "string.empty": `"username" must contain value`,
            "any.required": `"username" field is required`
        }),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required().messages({
            "string.empty": `"email" must contain value`,
            "any.required": `"email" field is required`,
            "string.email": `"email" must be a valid email format and include any of ['.com', '.net']`
        }),
        password: Joi.string().required().messages({
            "string.empty": `"password" must contain value`,
            "any.required": `"password" field is required`
        }),
    }).options({ abortEarly: false });

    const {error} =  userSchema.validate(req.body)
    
    if(error){
        // console.log(error)
        const errorMessages = error.details.map(each => each.message.replaceAll('"', "*")).join(', ')
        return res.status(401).json({error: 'Input Validation Error', message: errorMessages})
    }
    next()
}

//Middleware for Joi User Login API Input validation
exports.joiUserLoginInputValidater = (req, res, next) => {
    const loginSchema = Joi.object({
        username: Joi.string().required().messages({
            "string.empty": `"username" must contain value`,
            "any.required": `"username" field is required`
        }),
        password: Joi.string().required().messages({
            "string.empty": `"password" must contain value`,
            "any.required": `"password" field is required`
        }),
    }).options({ abortEarly: false });

    const {error} =  loginSchema.validate(req.body)
    
    if(error){
        // console.log(error)
        const errorMessages = error.details.map(each => each.message.replaceAll('"', "*")).join(', ')
        return res.status(401).json({error: 'Input Validation Error', message: errorMessages})
    }
    next()
}