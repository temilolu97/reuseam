const mongoose = require("mongoose")

const reusableSchema = mongoose.Schema({
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Category'
    },
    location:{
        type:String,
        required:[true, 'Please enter a location']
    },
    phoneNumber:{
        type:String,
        required:[true, 'Please enter your phone number']
    },
    status:{
        type:String,
        required:true,
        default:"unpicked"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    pickedBy:{
        type:mongoose.Schema.Types.ObjectId,
        default:null,
        ref:'Reuser'
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Reusable', reusableSchema);