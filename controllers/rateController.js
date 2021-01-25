const {Rate,validatedRate}=require('../models/rateModel')
const express=require('express')
const { updateProduct } = require('./productController')

RateProduct=async(req,res)=>{
    const body=req.body
    if(!body){
        return res.status(400).json({
            success:false,
            error:'You must provide a star and a comment',
        })
    }

    const error=validatedRate(req.body)

    if(error)
        return res.status(400).send(error)

    const rate=new  Rate(body)   

    if(!rate){
        return res.status(400).json({
            success:false,
            error:err
        })
    }

    rate.save()
        .then((doc)=>{
            return res.status(201).json({
                success:true,
                id:doc._id,
                message:'Thank you for your review'
            })
        })
}

updateRate=async(req,res)=>{
    const body =req.body

    if(!body){
        return res.status(400).json({
            success:false,
            error:'you must provide all details to update your rate'
        })
    }

    Rate.findOne({
        _id:req.params.id
    },(err,rate)=>{
        if(err)
            return res.status(400).json({
                err,
                message:'This  rate does not exist',
            })           
    },
    rate.proId=body.proId,
    rate.userId=body.userId,
    rate.stars=body.stars,
    rate.review=body.review,

    rate.save()
    .then(()=>{
        return  res.status(200).json({
            success:true,
            id:rate._id,
            message:'Rating updated',
        })
    })
    )
}

unrate=async(req,res)=>{
    await Rate.findByIdAndDelete({
        _id:req.params.id
    },(err,rate)=>{
        if(err){
            return res.status(400).json({
                success:false,
                error:err
            })
        }

        if(!rate){
            return res.status(404).json({
                success:false,
                message:'Rate not found'
            })
        }

        return res.status(200).json({
            success:true,
            data:rate
        })
    }).catch(err=>console.log(err))
}

getRateByStars=async(req,res)=>{
    await Rate.findOne({
        stars:req.params.stars
    },(err,rate)=>{
        if(err){
            return res.status(400).json({
                success:false,
                error:err
            })
        }
        if(!rate){
            return res.status(404).json({
                success:false,
                error:'Rate not found'
            })
        }
        return res.status(200).json({
            success:true,
            data:rate
        })
    }).catch(err=>console.log(err))
}

getRates=(req,res)=>{
    Rate.find()
}
module.exports={
    RateProduct
}