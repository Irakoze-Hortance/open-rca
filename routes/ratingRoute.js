const express=require('express')
const rateController=require('../controllers/rateController')
const router=express.Router()

router.post('/rate',rateController.RateProduct)
module.exports=router