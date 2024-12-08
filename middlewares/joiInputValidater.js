const Joi = require('joi')

//Middleware for Joi Task API Query Parameters validation
exports.joiTaskQueryParameterValidater = (req, res, next) => {
    const queryParameterSchema = Joi.object({
        status: Joi.string().valid(...['TODO', 'IN_PROGRESS', 'COMPLETED']),  //Restricting the acceptable status values
        priority: Joi.string().valid(...['LOW', 'MEDIUM', 'HIGH']),  //Restricting the acceptable priority values
        sort: Joi.string().valid(...['dueDate', 'createdAt']),  //Restricting the acceptable sort values
        page: Joi.number().min(1)  //Page value must be number datatype
    }).options({ abortEarly: false });  //To make sure all the feilds got validated before sending result

    const query = {
        status : req.query.status,
        priority : req.query.priority,
        sort : req.query.sort,
        page : req.query.page
    }
    

    const {error} =  queryParameterSchema.validate(query)  //Validating the schema and input object
    
    if(error){  //If validation not satisfied
        // console.log(error)
        const errorMessages = error.details.map(each => each.message.replaceAll('"', "*")).join(', ')  //Joining all the errors
        return res.status(400).json({error: 'Query Parameters Validation Error', message: errorMessages})
    }
    next()
}

//Middleware for Joi create and Update Task API Input validation
exports.joiTaskInputValidater = (req, res, next) => {
    const taskSchema = Joi.object({
        title: Joi.string().max(100).required().messages({
            "string.empty": `"title" must contain value`,  //Custom error message for empty value
            "any.required": `"title" field is required`  //custom error message for missing field
        }),
        description: Joi.string().messages({
            "string.empty": `"title" must contain value`  //Custom error message for empty value
        }),
        status: Joi.string().valid(...['TODO', 'IN_PROGRESS', 'COMPLETED']), //Restricting the acceptable values
        priority: Joi.string().valid(...['LOW', 'MEDIUM', 'HIGH']), //Restricting the acceptable values
        dueDate: Joi.date(),
    }).options({ abortEarly: false });

    const {error} =  taskSchema.validate(req.body) //Validating the schema and input object
    
    if(error){  //If validation not satisfied
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
            "string.empty": `"username" must contain value`,  //Custom error message for empty value
            "any.required": `"username" field is required`  //custom error message for missing field
        }),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required().messages({
            "string.empty": `"email" must contain value`,  //Custom error message for empty value
            "any.required": `"email" field is required`,  //custom error message for missing field
            "string.email": `"email" must be a valid email format and include any of ['.com', '.net']`
        }),
        password: Joi.string().required().messages({
            "string.empty": `"password" must contain value`,  //Custom error message for empty value
            "any.required": `"password" field is required`  //custom error message for missing field
        }),
    }).options({ abortEarly: false });

    const {error} =  userSchema.validate(req.body)  //Validating the schema and input object
    
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
            "string.empty": `"username" must contain value`,  //Custom error message for empty value
            "any.required": `"username" field is required`  //custom error message for missing field
        }),
        password: Joi.string().required().messages({
            "string.empty": `"password" must contain value`,  //Custom error message for empty value
            "any.required": `"password" field is required`  //custom error message for missing field
        }),
    }).options({ abortEarly: false });

    const {error} =  loginSchema.validate(req.body)  //Validating the schema and input object
    
    if(error){
        // console.log(error)
        const errorMessages = error.details.map(each => each.message.replaceAll('"', "*")).join(', ')
        return res.status(401).json({error: 'Input Validation Error', message: errorMessages})
    }
    next()
}