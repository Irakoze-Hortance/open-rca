const {Product,validateProductSchema}=require('../models/productModel')
const multer=require('multer')
const express=require('express')

const storage=multer.diskStorage({
    destination:(req,file,callb)=>{
        callb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});

const docFilter=(req,file,cb)=>{
    if(!file.originalname.match(/\.(jpeg|jpg|png)$/)){
        return cb(new Error('You can only upload document file!'),false);
    }
    cb(null,true);
}

const upload=multer({storage:storage,
fileFilter:docFilter})


createProduct=async(req,res)=>{
    const body=req.body
    if(!body){
        return res.status(400).json({
            success:false,
            error:'You must provide product details',
        })
    }
    const  error=validateProductSchema(req.body)
    if(error)
        return res.status(400).send(error)
    
    const product=new Product(body)

    if(!product){
        return res.status(400).json({
            success:false,
            error:err
        })
    }

    product.save()
        .then((doc)=>{
            return res.status(201).json({
                success:true,
                id:doc_id,
                message:'Product added successfully...'
            })
        })


}

updateProduct=async (req,res)=>{
    const body=req.body

    if(!body){
        return res.status(400).json({
            success:false,
            error:'You must provide all details to update a product'
        })
    }

    Product.findOne({
        _id:req.params.id
    },(err,product)=>{
        if(err)
            return res.status(400).json({
                err,
                message:'Product not found',
            })
    },
    product.proId=body.proId,
    product.proName=body.proName,
    product.catId=body.catId,
    product.quantity=body.quantity,
    product.price=body.price,
    product.description=body.description,
    product.review=body.review,
    product.productImg=req.file.filename,
    product.tags=body.tags,

    product.save()
    .then(()=>{
        return res.status(200).json({
            success:'true',
            id:product._id,
            message:'Product updated',
        })
    })
    )
}

removeProduct=async(req,res)=>{
    await Product.findByIdAndDelete({
        _id:req.params.id
    },(err,product)=>{
        if(err){
            return  res.status(400).json({
                success:false,
                error:err
            })
        }

        if(!product){
            return  res.status(404).json({
                success:false,
                message:'Product not found'
            })

        }

        return res.status(200).json({
            success:true,
            data:product
        })
    }).catch(err=>console.log(err))
}

getProductById=async(req,res)=>{
    await Product.findOne({
        _id:req.params.id
    },(err,product)=>{
        if(err){
            return res.status(400).json({
                success:false,
                error:err
            })
        }
        if(!product){
            return res.status(404).json({
                success:false,
                error:'Product not found'
            })
        }
        return res.status(200).json({
            success:true,
            data:product
        })
        
    }).catch(err=>console.log(err))
}

getProducts=(req,res)=>{
    Product.find()
    .then((docs)=>{
        if(docs.length<1){
            return res.status(400).send({
                success:false,
                error:'Product not found'
            })
        }else{
            return res.status(200).send({
                success:true,
                data:docs
            })
        }
    }).catch(e=>{
        return res.status(400).send({
            success:false,
            message:"something went wrong!"
        })
    })
}

module.exports={
    createProduct,
    updateProduct,
    removeProduct,
    getProducts,
    getProductById
}