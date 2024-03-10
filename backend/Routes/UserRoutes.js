const express = require("express")
const router = express.Router()
const { registerUser, login, getMe } = require("../Controller/userController")
const {protect} = require("../Middleware/AuthMiddleware")
const { upload } = require("../Middleware/UploadFile")
const { uploadProfilePicture, removeProfilePicture } = require("../Controller/userController")

router.post("/register", registerUser)
router.post("/login", login)
router.get("/me", protect, getMe)
router.post("/upload-picture", protect, upload.single('picture'), uploadProfilePicture)
router.delete("/remove-picture", protect, removeProfilePicture)

module.exports = router