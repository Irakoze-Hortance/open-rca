const mongoose=require('mongoose')
let MONGO_URI="mongodb+srv://admin:amdin@2020@cluster0.1n16l.mongodb.net/bosses-ecommerce?retryWrites=true&w=majority";
mongoose.connect(MONG_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Connected to db successfully...")

})
.catch(e=>{
    console.error("Error connecting to db",e)
})
require=('../models/productModel')
require('../models/rateModel')

const db=mongoose.connection
module.exports=db
