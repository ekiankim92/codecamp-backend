import { getToday } from './utils.js'
import nodemailer from "nodemailer"

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
    // 네이버에서는 이메일 플랙스가 먹히나, 구글 크롬은 플렉스가 안먹힘. 고로 옛날 css 버전을 이용해야지 모든 css 가 먹힘

    const myTemplate = `
        <html>
            <body>
                <div style="display: flex;">
                    <div style="width: 500px;">
                        <h1>${name}님 가입을 환영합니다!</h1>
                        <hr />
                        <div style="color: red;">이름: ${name}</div>
                        <div>나이: ${age}</div>
                        <div>학교: ${school}</div>
                        <div>가입일: ${getToday()}</div>
                    </div>
                </div>
            </body>
        </html>
    `
    return myTemplate
}

export async function sendTemplateToEmail ({ email, result }) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user:  "eunkukkim1992@gmail.com",
          pass: "123456789"
        }
      });

    const response = await transporter.sendMail({
        from: 'eunkukkim1992@gmail.com',
        to: email,
        subject: "Thank you for registration",
        html: result
    })

    console.log("response:", response)
}