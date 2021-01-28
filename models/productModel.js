const mongoose=require('mongoose')
const Joi=require('joi');

const Schema=mongoose.Schema

const ProductSchema=new Schema({
    proId:{
        type:String,
        required:true
    },
    proName:{
        type:String,
        required:true
    },
    catId:{
        type:String,
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
    productImages:{
        type:Array,
        required:true
    },
    tag:{
        type:String,
        required:true
    },
    orderDate:{
        type:Date,
        required:true
    }
})

function validateProductSchema(Product) {
    const JoiSchema=Joi.object({
        proId:Joi.string().required(),
        proName:Joi.string().required().max(20).min(2),
        catId:Joi.string().required(),
        quantity:Joi.number().required(),
        price:Joi.number().required(),
        description:Joi.string().required().max(20).min(2),
        review:Joi.string().required().max(20).min(2),
        tag:Joi.string().required(),
        orderDate:Joi.date().required(),
        productImages:Joi.array().required()
    }).options({abortEarly:false});
return JoiSchema.validate(Product)
   
}
module.exports.Product=mongoose.model('Product',ProductSchema)
module.exports.validateProductSchema=validateProductSchema
