import express from "express"
import { ProductController } from "./mvc/controllers/product.controller"

const app = express()

const productController = new ProductController()

// 상품 API
app.post('/products/buy', productController.buyProduct)
app.post("/products/refund", productController.refundProduct)


app.listen(4000)
