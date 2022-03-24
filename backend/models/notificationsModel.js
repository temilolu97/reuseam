const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    reusable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Reusable'
    },
    amountEarned:{
        type:Number,
        required:true
    }
})