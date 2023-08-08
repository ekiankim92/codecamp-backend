// import { CashService } from "./services/cash.service"
// import { ProductService } from "./services/product.service"

export class ProductController {
    // ProductController 는 CashService 에 의존하고 있다 

    cashService; 
    productService;

    constructor(cashService, productService) {
        this.cashService = cashService
        this.productService = productService
    }

    buyProduct =  (req, res)  => {
        // const cashService = new CashService()
        const hasMoney = this.cashService.checkValue()
    
        // const productService = new ProductService()
        const isSoldout = this.productService.checkSoldout()

        if (hasMoney && !isSoldout) {
        res.send("상품 구매 완료")
        }
    }

    refundProduct = (req, res) => {
        // const productService = new ProductService()
        const isSoldout = this.productService.checkSoldout()
        
        if (isSoldout) {
            res.send("상품 환불 완료")
        }
    }
}