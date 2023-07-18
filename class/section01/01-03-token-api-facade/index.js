function checkPhone (phoneNum) {
    if (phoneNum.length < 10 || phoneNum.length > 11) {
        console.log("Error Occured. Please enter the correct phone number")
        return false // 함수의 종료 
    } else {
        return true
    }
}

function getToken () {
    const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
    console.log('result:', result)
    return result
}

function sendTokenToSMS (phoneNum, result) {
    console.log(`${phoneNum} 번호로 인증번호 ${result} 를 전송합니다`)
}


function createTokenOfPhone (phoneNum) { // parameter
    // 1. 휴대폰 번호 자릿수 맞는지 확인하기 (10~11자리)
    const isValid = checkPhone(phoneNum)
    if (isValid === false) return 

    // 2. 휴대폰 토큰 6자리 만들기 
    const myToken = getToken()

    // 3. 핸드폰 번호에 토큰 전송하기     
    sendTokenToSMS(phoneNum, myToken)
}

createTokenOfPhone("01012345678") // argument