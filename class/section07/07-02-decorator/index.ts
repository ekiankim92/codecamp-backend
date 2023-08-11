function Controller (props: any) {
    console.log("==============")
    console.log("props:", props)
    console.log("==============")
}


// CatsController 가 Controller 에 인자 값으로 들어가는거임
// @Controller 는 그냥 함수이다
// Decorator 는 함수 
@Controller
class CatsController {

}