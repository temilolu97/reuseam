const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Reuser = require('../models/reuserModel')

const protect = asyncHandler(async(req, res, next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from header
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            //GET User from token
            req.user = await User.findById(decoded.id).select('-password')
            
            next()
        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Unauthorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Unauthorized, no token')
    }
})

const protected = asyncHandler(async(req, res, next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from header
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            //GET User from token
            req.reuser = await Reuser.findById(decoded.id).select('-password')
            
            next()
        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Unauthorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Unauthorized, no token')
    }
})


module.exports ={protect,protected}