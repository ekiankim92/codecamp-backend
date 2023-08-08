import express from "express"
import { ProductController } from "./mvc/controllers/product.controller"
import { CouponController } from "./mvc/controllers/coupon.controller"

const app = express()

const productController = new ProductController()
const couponController = new CouponController

// 상품 API
app.post('/products/buy', productController.buyProduct)
app.post("/products/refund", productController.refundProduct)

// 쿠폰 (상품권) API
app.post("/coupons/buy", couponController.buyCoupon) // 상품권을 돈주고 구매하는 API 

app.listen(4000)
