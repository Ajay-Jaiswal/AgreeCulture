const express = require("express")
const router = express.Router()

const userController = require('../controller/userController')
const agreecultureController = require("../controller/agreecultureController")
const auth = require("../middleware/auth")

router.post("/register", userController.createUser)
router.post("/login", userController.loginUser)


// agreeculture data
router.post("/createblog",auth.loginCheck, agreecultureController.createAgreeculture)
router.get("/blogs",auth.loginCheck,agreecultureController.getAgreeBlog)
router.put("/update/:blogId",auth.loginCheck,agreecultureController.updateDetails)
router.delete("/delete/:blogId",auth.loginCheck,agreecultureController.deleteBlogById)


module.exports = router