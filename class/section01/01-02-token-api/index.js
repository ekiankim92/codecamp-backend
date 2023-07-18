// 인증번호 요청 API 

function createTokenOfPhone (phoneNum) { // parameter
    // 1. 휴대폰 번호 자릿수 맞는지 확인하기 (10~11자리)
    if (phoneNum.length >= 10 || phoneNum.length <= 11) {
        // 2. 휴대폰 토큰 6자리 만들기 
        const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
        console.log('result:', result)

        // 3. 핸드폰 번호에 토큰 전송하기     
        console.log(`${phoneNum} 번호로 인증번호 ${result} 를 전송합니다`)
    } else {
        console.log("Error Occured. Please enter the correct phone number")
    }
}


// 좋은 예 
function createTokenOfPhone (phoneNum) { // parameter
    // 먼저 에러를 찾아서 일찍 종료 시키기 Early exit statement 
    if (phoneNum.length < 10 || phoneNum.length > 11) {
        console.log("Error Occured. Please enter the correct phone number")
        return 
    }

    const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
    console.log('result:', result)

    console.log(`${phoneNum} 번호로 인증번호 ${result} 를 전송합니다`)
}

createTokenOfPhone("01012345678") // argument