const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const Reuser = require("../models/reuserModel")
const registerUser =asyncHandler( async(req,res) =>{
    const {firstName, lastName, email,phoneNumber, password} = req.body;
    console.log(req.body)
    if(!email || !firstName ||!lastName || !password){
        res.status(400)
        throw new Error("Please add all fields")
    }
    // check if user exists
    const emailExists =await Reuser.findOne({email})
    const phoneNumberExists = await Reuser.findOne({phoneNumber})
    if(emailExists){
        res.status(400)
        throw new Error("user with this email already exists")
    }
    if(phoneNumberExists){
        res.status(400)
        throw new Error("user with this phone number already exists")
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const reuser = await Reuser.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        password:hashedPassword
    })

    if(reuser){
        res.status(201).json({
            _id:reuser.id,
            firstname: reuser.firstName,
            lastname: reuser.lastName,
            email: reuser.email,
            phoneNumber: reuser.phoneNumber,
            token: generateToken(reuser._id)
        })
    }
    else{
        res.status(400)
        throw new Error("User could not be created")
    }
    res.json({
        message:"Register User"
    })
})

const loginUser =asyncHandler( async(req,res) =>{
    const {email, password} = req.body;

    const reuser = await Reuser.findOne({email});
    if(reuser && (await bcrypt.compare(password, reuser.password))){
        res.json({
            _id:reuser.id,
            firstname: reuser.firstName,
            lastname: reuser.lastName,
            email: reuser.email,
            phoneNumber: reuser.phoneNumber,
            token: generateToken(reuser._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

const getMe =asyncHandler(async(req,res) =>{
    const {_id, firstname,lastname,phoneNumber, email} = await Reuser.findById(req.user.id);
    res.status(200).json({
        id:_id,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneNumber: phoneNumber,
    })
})

//Generate JWT
const generateToken =(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}


module.exports ={
    registerUser,
    loginUser,
    getMe
}