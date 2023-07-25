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

export function sendTokenToSMS (phoneNum, result) {
    console.log(`${phoneNum} 번호로 인증번호 ${result} 를 전송합니다`)
}