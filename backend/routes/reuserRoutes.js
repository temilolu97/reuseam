const express = require('express')
const {registerUser, loginUser, getMe} = require('../controllers/reuserController')
const router = express.Router()

const {protected} = require('../middleware/authMiddleware')

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/me',protected, getMe)
module.exports = router 