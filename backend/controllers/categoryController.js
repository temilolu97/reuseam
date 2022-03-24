const asyncHandler = require('express-async-handler')

const Category = require('../models/categoryModel.js')

//Get all Categories
const GetAllCategories =asyncHandler(async(req,res)=>{
    const categories = await Category.find()
    res.status(200).json(categories);
})
//add Category
const AddCategory = asyncHandler(async(req,res)=>{
    const {name} = req.body
    if(!name){
        res.status(400);
        throw new Error('Please add a text field')
    }
    const category = await Category.create({
        name
    })
    res.status(200).json(category);
})

module.exports = {AddCategory, GetAllCategories}