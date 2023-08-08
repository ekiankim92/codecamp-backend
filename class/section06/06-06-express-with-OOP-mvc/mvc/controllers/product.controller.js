import { CashService } from "./services/cash.service"
import { ProductService } from "./services/product.service"

export class ProductController {
    buyProduct = function (req, res) {
        const cashService = new CashService()
        const hasMoney = cashService.checkValue()

        const productService = new ProductService()
        const isSoldout = productService.checkSoldout()

        if (hasMoney && !isSoldout) {
        res.send("상품 구매 완료")
        }
    }

    refundProduct = (req, res) => {
        const productService = new ProductService()
        const isSoldout = productService.checkSoldout()
        
        if (isSoldout) {
            res.send("상품 환불 완료")
        }
    }
}