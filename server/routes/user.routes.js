const express=require("express")
const {signinUser,signupUser,updateUser,searchUser,logoutUser}=require("../controllers/user.controller")
const router=express.Router();
const {authMiddleware}=require("../middlewares/auth.middleware")

router.post('/signup',signupUser)
router.post('/signin',signinUser)
router.get('/logout',authMiddleware,logoutUser)
router.put('/me',authMiddleware,updateUser)
router.get('/bulk',authMiddleware,searchUser)

module.exports=router;