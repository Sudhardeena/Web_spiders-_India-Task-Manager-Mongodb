const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticateToken = (req, res, next) => {
    let jwtToken 
    try{
        const authHeader = req.headers['authorization']
        if(!authHeader){
            throw new Error('Authorization header is needed with JWT TOKEN as value')
        }
        
        const jwtToken = authHeader.split(' ')
        if(jwtToken[0] !== 'Bearer'){
            throw new Error('invalid TOKEN TYPE, token pattern should be "Bearer <JWT TOKEN>"')
        }

        if(!jwtToken[1]){
            throw new Error('invalid JWT TOKEN, token pattern should be "Bearer <JWT TOKEN>"')
        }

        jwt.verify(jwtToken[1], process.env.JWT_SECRET_KEY, (error, payload)=>{
            if(error){
                res.status(401).json({message: error.message})
            }
            req.user = payload
            next()
        })
    }catch(err){
        res.status(401).json({message: err.message})
    }
}

module.exports = authenticateToken