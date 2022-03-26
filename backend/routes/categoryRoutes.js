const express = require("express")

const router = express.Router()
const {GetAllCategories, AddCategory} = require('../controllers/categoryController.js')

const {protect} = require('../middleware/authMiddleware')

/** 
 *@swagger
 *components:
 *  schemas:
 *      Category:
 *          type:object
 *          required:
 *              -name
 *          properties:
 *              id:
 *                  type:string
 *                  description: Auto generated id of Category
 *              name:
 *                  type:string
 *                  description: The category name
 */

router.get('/',protect, GetAllCategories)
router.post('/',protect, AddCategory)

module.exports = router