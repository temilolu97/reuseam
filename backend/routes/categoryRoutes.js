const express = require("express")

const router = express.Router()
const {GetAllCategories, AddCategory} = require('../controllers/categoryController.js')

const {protect} = require('../middleware/authMiddleware')

router.get('/',protect, GetAllCategories)
router.post('/',protect, AddCategory)

module.exports = router