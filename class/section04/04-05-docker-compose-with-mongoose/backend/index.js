import express from "express"
import { checkPhone, getToken, sendTokenToSMS } from "./phone.js"
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { options } from "./swagger/config.js";
import cors from "cors"
import { checkEmail, createTemplate, sendTemplateToEmail } from "./email.js";
import mongoose from "mongoose"


const app = express()
app.use(express.json()) // 옛날에는 bodyParser 사용
app.use(cors()) // cors 문제를 허용한다는 의미. 이건 전체를 허용. cors([])
// use 는 get, post, put, delete 다 할수 있음
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get('/boards', function (req, res, next) { // next 는 다음것도 실행할수 있음
  // 1. DB에 접속 후, 데이터를 조회 => 데이터를 조회했다고 가정 
  const result = [
    { number: 1, writer: "Paul", title: "This is title", contents: "This is the contents for Paul"}, 
    { number: 2, writer: "Chris", title: "This is Chris", contents: "This is the contents for Chris"}, 
    { number: 3, writer: "Matt", title: "This is Matt", contents: "This is the contents for Matt"}, 
  ]

  // 2. DB에서 꺼내온 결과를 브라우저에 응답(response) 주기

  res.send(result)
}) 

app.post('/boards', function (req, res) { // req 는 프론트에서 보내주는 데이터 값 
  // 1. 브라우저에서 보내준 데이터 확인하기
  console.log("req:", req)
  console.log("============") 
  console.log("req.body:", req.body)

  // 2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정 
 
  // 3. DB에 저장된 결과를 브라우저에 응답(response) 주기
  res.send('게시물 등록에 성공하였%습니다.')
}) 

app.post('/tokens/phone', function (req, res) {
    // 1. 휴대폰 번호 자릿수 맞는지 확인하기 (10~11자리)
    const isValid = checkPhone(req.body.phoneNum)
    if (isValid === false) return 

    // 2. 휴대폰 토큰 6자리 만들기 
    const myToken = getToken()

    // 3. 핸드폰 번호에 토큰 전송하기     
    sendTokenToSMS(req.body.phoneNum, myToken)

    res.send("인증 완료")
})


app.post('/users', function (req, res) {
  const {name, age, school, email} = req.body

  // 1. 이메일이 정상인지 확인 (1-존재여부, 2-"@" 포함여부)
  const isValid = checkEmail({ email })
  if (isValid === false) return 

  // 2. 가입환영 템플릿 만들기
  const result = createTemplate({name, age, school})
  // console.log("result:", result)

  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail({ email, result })

  res.send("가입완료가 되었습니다!")
})

// docker name resolution
mongoose.connect("mongodb://my-database:27017/mydocker").then(() => console.log("db 접속에 성공하셨습니다")).catch(() => console.log("db 접속에 실패하였습니다"))

app.listen(4000)