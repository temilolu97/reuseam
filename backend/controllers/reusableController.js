const asyncHandler = require('express-async-handler')

const Reusable = require('../models/reusableModel.js')

//Get my reusables
const GetMyReusables =asyncHandler(async(req,res)=>{
    const myReusables = await Reusable.find({user: req.user.id})
    res.status(200).json(myReusables);
})
//add Category
const AddReusable = asyncHandler(async(req,res)=>{
    const {category, phoneNumber, location, status} = req.body
    if(!category || !phoneNumber || !location){
        res.status(400);
        throw new Error('No field can be empty')
    }
    const reusable = await Reusable.create({
        category,
        phoneNumber,
        location,
        user: req.user.id,
        status
    })
    res.status(200).json(reusable);
})

const updateReusableStatus = asyncHandler(async(req,res)=>{
    try{
        console.log(req.reuser.id)
        const reusable = await Reusable.findByIdAndUpdate(req.params.id, {status:"picked", pickedBy:req.reuser.id})
        return res.status(200).json({
            reusable,
            "message":"Reusable has been picked"
        })
    }
    catch(error){
        res.status(500).json({
            message:"Something went wrong"
        })
    }
    
})

const getMyPickedReusables = asyncHandler(async(req,res)=>{
    try{
        console.log(req.reuser)
        const mypickedreusables = await Reusable.find({pickedBy: req.reuser.id})
        return res.status(200).json({
            mypickedreusables,
        })
    }
    catch(error){
        res.status(500).json({
            message:"Something went wrong"
        })
    }
    
})

module.exports = {GetMyReusables, AddReusable, updateReusableStatus,getMyPickedReusables}