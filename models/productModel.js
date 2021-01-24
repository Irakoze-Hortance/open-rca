const mongoose=require('mongoose')
const Joi=require('joi')
const Schema=mongoose.Schema

const Product=new Schema({
    proId:{
        type:Number
    },
    proName:{
        type:String,
        required:true
    },
    catId:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    productImage:{
        type:String,
        required:true
    },
    tags:{
        type:Array,
        required:true
    }
})

function validateProductSchema(Product) {
    const JoiSchema=Joi.object({
        proId:Joi.number().required(),
        proName:Joi.string().required().max(20).min(2),
        catId:Joi.number().required(),
        quantity:Joi.number().required(),
        price:Joi.number().required(),
        description:Joi.string().required().max(20).min(2),
        review:Joi.string().required().max(20).min(2),
        tag:Joi.string().required(),
        productImage:Joi.string().required()
    }).options({abortEarly:false});
return JoiSchema.validate(Product)
   
}
module.exports.Product=mongoose.model('Product',Product)
module.exports.validateProductSchema=validateProductSchema