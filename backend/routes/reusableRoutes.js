const express = require("express")

const router = express.Router()
const {GetMyReusables, AddReusable, updateReusableStatus, getMyPickedReusables} = require('../controllers/reusableController.js')

const {protect, protected} = require('../middleware/authMiddleware')

router.get('/myreusables',protect, GetMyReusables)
router.post('/',protect, AddReusable)
router.put("/update-status/:id", protected, updateReusableStatus)
router.get("/mypicked-reusables",protected, getMyPickedReusables)

module.exports = router