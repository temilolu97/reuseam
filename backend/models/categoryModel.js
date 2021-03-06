const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Category name cannot be empty"]
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Category", categorySchema)