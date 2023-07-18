function checkEmail ({ email }) {
    console.log("email:", email)
    if (!email || !email.includes("@")) {
        console.log("이메일을 다시 한번 확인해주세요")
        return false
    } else {
        return true
    }
}

function createTemplate ({name, age, school, createdAt}) {
    const myTemplate = `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!</h1>
                <hr />
                <div>이름: ${name}</div>
                <div>나이: ${age}</div>
                <div>학교: ${school}</div>
                <div>가입일: ${createdAt}</div>
            </body>
        </html>
    `
    return myTemplate
}

function sendTemplateToEmail ({ email, result }) {
    console.log(`${email} 이메일로 가입환영템플릿 ${result} 를 전송합니다`)
}


function createUser ({name, age, school, email, createdAt}) {
    // 1. 이메일이 정상인지 확인 (1-존재여부, 2-"@" 포함여부)
    const isValid = checkEmail({ email })
    if (isValid === false) return 

    // 2. 가입환영 템플릿 만들기
    const result = createTemplate({name, age, school, createdAt})
    // console.log("result:", result)

    // 3. 이메일에 가입환영 템플릿 전송하기
    sendTemplateToEmail({ email, result })

}

const name = "Chulsoo"
const age = 12 
const school = "SquirrelElementarySchool"
const email = "aa@gmail.com"
const createdAt = new Date().toDateString().slice(4)

createUser({name, age, school, email, createdAt})