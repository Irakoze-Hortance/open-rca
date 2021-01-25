const express=require('express')
const  productController=require('../controllers/productController')
const router=express.Router()

router.get('/product/get-product/:id',productController.getProductById)
router.get('/products/getAll',productController.getProducts)
router.post('products/addNew',productController.createProduct)
router.put('/products/update',productController.updateProduct)
router.delete('/products/:id',productController.removeProduct)

module.exports=router