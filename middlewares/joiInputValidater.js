const Joi = require('joi')

exports.joiTaskInputValidater = (req, res, next) => {
    const taskSchema = Joi.object({
        title: Joi.string().max(100).required(),
        description: Joi.string(),
        status: Joi.string().valid(...['TODO', 'IN_PROGRESS', 'COMPLETED']),
        priority: Joi.string().valid(...['LOW', 'MEDIUM', 'HIGH']),
        dueDate: Joi.date(),
    }).options({ abortEarly: false });

    const {value, error} =  taskSchema.validate(req.body)
    
    if(error){
        console.log(error)
        const errorMessages = error.details.map(each => each.message.replaceAll('"', "*")).join(', ')
        return res.status(400).json({error: 'Input Validation Error', message: errorMessages})
    }
    next()
}