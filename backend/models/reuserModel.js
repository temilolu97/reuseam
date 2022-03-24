const mongoose = require('mongoose')

const reuserSchema =mongoose.Schema({
    firstName:{
        type:String,
        required:[true, 'Please add a first name']
    },
    lastName:{
        type:String,
        required:[true, 'Please add a last name']
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'Please add an email']
    },
    phoneNumber:{
        type:String,
        unique:true,
        required:[true, 'Please add an phone number']
    },
    password:{
        type:String,
        required:[true, 'Please add a password']
    },  
}, {
    timestamps:true
})

module.exports = mongoose.model('Reuser', reuserSchema)