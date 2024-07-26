const express=require("express");
const router=express.Router();
const {findBalance,moneyTransfer}=require("../controllers/account.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.get("/balance",authMiddleware,findBalance)
router.post("/transfer",authMiddleware,moneyTransfer)

module.exports=router;