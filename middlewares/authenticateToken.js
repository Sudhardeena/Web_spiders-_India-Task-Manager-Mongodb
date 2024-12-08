const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticateToken = (req, res, next) => {
    try{
        const authHeader = req.headers['authorization']  //accessing authorization from request header
        if(!authHeader){  //If authorization not presented in request header throws error
            throw new Error('Authorization header is needed with JWT TOKEN as value')
        }
        
        const jwtToken = authHeader.split(' ')
        if(jwtToken[0] !== 'Bearer'){  //Checking for Bearer before the token if not presented throw error
            throw new Error('invalid TOKEN TYPE, token pattern should be "Bearer <JWT TOKEN>"')
        }

        if(!jwtToken[1]){  //Checking for token string if not presented throws error
            throw new Error('invalid JWT TOKEN, token pattern should be "Bearer <JWT TOKEN>"')
        }

        jwt.verify(jwtToken[1], process.env.JWT_SECRET_KEY, (error, payload)=>{  //Verify the jwt token passed
            if(error){  //If token is invaled send error message
                res.status(401).json({message: error.message})
            }else{
                req.user = payload  //If token verified passing user Id to next middleware
                next()
            }
        })
    }catch(err){
        res.status(401).json({message: err.message})  //Sending error
    }
}

module.exports = authenticateToken