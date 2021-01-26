const  express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors')

require('./open-rca/DB/db')
const app=express()
const port=4000
const productRouter=require('./open-rca/routes/productRoute')
const rateRouter=require('./open-rca/routes/ratingRoute')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/products',productRouter)
app.use('/api/rating',rateRouter)
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
