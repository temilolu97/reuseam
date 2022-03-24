const asyncHandler = require('express-async-handler')

const Wallet = require('../models/walletModel')

const getMyWalletBalance =asyncHandler((req,res)=>{
    const {balance} = Wallet.find({user:req.user.id})
    return res.status(200).json(balance)
})

const fundWallet =((req,res)=>{
    const {balance} = Wallet.find({user:req.user.id})
    const {amount} = req.body;
    const newbalance = balance + amount;

})
module.exports ={getMyWalletBalance, fundWallet}