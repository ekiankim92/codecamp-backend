import {checkEmail, createTemplate, sendTemplateToEmail} from './email.js'

function createUser ({name, age, school, email}) {
    // 1. 이메일이 정상인지 확인 (1-존재여부, 2-"@" 포함여부)
    const isValid = checkEmail({ email })
    if (isValid === false) return 

    // 2. 가입환영 템플릿 만들기
    const result = createTemplate({name, age, school})
    // console.log("result:", result)

    // 3. 이메일에 가입환영 템플릿 전송하기
    sendTemplateToEmail({ email, result })

}

const name = "Chulsoo"
const age = 12 
const school = "SquirrelElementarySchool"
const email = "aa@gmail.com"
// const createdAt = new Date().toDateString().slice(4)

createUser({name, age, school, email})