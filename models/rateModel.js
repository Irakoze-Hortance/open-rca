const mongoose=require('mongoose')
const Joi=require('joi')
const Schema=mongoose.Schema

const Rate=new Schema({
    rateNbr:{
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
        rateNbr:Joi.number().min(1).max(5),
        review:Joi.String().max(200)
    }).options({abortEarly:false});
return JoiSchema.validate(Rate)
}

module.exportsRate=mongoose.model('Rate',Rate)
module.exports.validatedRate=validatedRate