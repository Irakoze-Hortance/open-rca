const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/open-rca',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Connected to db successfully...")

})
.catch(e=>{
    console.erros("Error connecting to db",e.message)
})

const db=mongoose.connection
module.exports=db
