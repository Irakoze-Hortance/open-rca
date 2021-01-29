const mongoose=require('mongoose')
const Joi=require('joi')
const Schema=mongoose.Schema

const Rate=new Schema({
    userId:{
        type:String,
        required:true
    },
    
    proid:{
        type:String,
        required:true
    },
    stars:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true
    }
})

function validatedRate(Rate) {
    const JoiSchema=Joi.object({
        userId:Joi.string(),
        proId:Joi.string(),
        stars:Joi.number().min(1).max(5),
        review:Joi.string()
    }).options({abortEarly:false});
return JoiSchema.validate(Rate)
}

module.exports.Rate=mongoose.model('Rate',Rate)
module.exports.validatedRate=validatedRate
