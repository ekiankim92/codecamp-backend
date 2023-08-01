import coolsms from "coolsms-node-sdk"
import 'dotenv/config'

const mysms = coolsms.default

export function checkPhone (phoneNum) {
    if (phoneNum.length < 10 || phoneNum.length > 11) {
        console.log("Error Occured. Please enter the correct phone number")
        return false // 함수의 종료 
    } else {
        return true
    }
}

export function getToken () {
    const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
    console.log('result:', result)
    return result
}

export async function sendTokenToSMS (phoneNum, result) {
    const messageService = new mysms(process.env.API_KEY, process.env.API_SECRET)

    const smsResult = await messageService.sendOne({
        to: phoneNum,
        from: "01044819260",
        text: `[김은국] 안녕하세요? 쿠쿠로삥뽕 요청하신 인증번호는 ${result} 입니다.`
    })

    console.log("result:", smsResult)

    console.log(`${phoneNum} 번호로 인증번호 ${result} 를 전송합니다`)
}