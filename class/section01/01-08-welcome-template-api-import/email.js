import { getToday } from './utils.js'

export function checkEmail ({ email }) {
    console.log("email:", email)
    if (!email || !email.includes("@")) {
        console.log("이메일을 다시 한번 확인해주세요")
        return false
    } else {
        return true
    }
}

export function createTemplate ({name, age, school}) {
    const myTemplate = `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!</h1>
                <hr />
                <div>이름: ${name}</div>
                <div>나이: ${age}</div>
                <div>학교: ${school}</div>
                <div>가입일: ${getToday()}</div>
            </body>
        </html>
    `
    return myTemplate
}

export function sendTemplateToEmail ({ email, result }) {
    console.log(`${email} 이메일로 가입환영템플릿 ${result} 를 전송합니다`)
}