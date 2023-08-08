import express from "express"
import { ProductController } from "./mvc/controllers/product.controller.js"
import { CouponController } from "./mvc/controllers/coupon.controller.js"
import { CashService } from "./mvc/controllers/services/cash.service.js"
import { ProductService } from "./mvc/controllers/services/product.service.js"
import { PointService } from "./mvc/controllers/services/point.service.js"

const app = express()
                                             // 의존성주입으로 발생하는 장점
const cashService = new CashService()        // 1. new 한번으로 모든 곳에서 재사용 하고 있음 (싱글톤패턴)
const productService = new ProductService() // 2. 의존성 주입으로 몽땅 한꺼번에 변경 가능
const pointeService = new PointService()    // 3. 의존성 주입으로 쿠폰 구매 방식을 포인트 결제로 안전하게 변경 가능

                                            // [부가설명]
                                            // 1. ProductController 가 CashService 에 의존하고 있음. 
                                            // => 이 상황을 "강하게 결합되어있다. 
                                            // => tight-coupling"
                                            
                                            // 2. 이를 개선하게 위해서 "느스한 결합" 으로 변경할 필요가 없음. 
                                            // => loose-coupling. 이를 의존성주입으로 해결 (Dependency Injection)
                                            // 이 역활을 대신 해주는 Nest.js 기능 IoC 컨테니어 (Inversion of Control: 알아서 new 해서 넣어주는 애. 즉, DI 해줌)

                                            // 3. 의존성주입으로 "싱글톤패턴" 구현 가능해짐
                                            // => 의존성 주입이면 "싱글톤패턴" 인가? 그건 아님. 
                                            // => "싱글톤패턴" 은 new 가 각각의 하나만 있을때를 말함 


// 상품 API
const productController = new ProductController(cashService, productService)
app.post('/products/buy', productController.buyProduct)
app.post("/products/refund", productController.refundProduct)

// 쿠폰 (상품권) API
const couponController = new CouponController(pointeService)
app.post("/coupons/buy", couponController.buyCoupon) // 상품권을 돈주고 구매하는 API 

app.listen(4000)
