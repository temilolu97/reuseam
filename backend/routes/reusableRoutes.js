const express = require("express")

const router = express.Router()
const {GetMyReusables, AddReusable, updateReusableStatus} = require('../controllers/reusableController.js')

const {protect} = require('../middleware/authMiddleware')

router.get('/myreusables',protect, GetMyReusables)
router.post('/',protect, AddReusable)
router.put("/update-status/:id", protect, updateReusableStatus)

module.exports = router