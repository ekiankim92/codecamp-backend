import axios from "axios"

// 1. Asynchronous method
function fetchAsync () {
    // JS 는 동기이나, axios 같은건 비동기식임 
    const result = axios.get("https://koreanjson.com/posts/1")
    console.log("Async method:", result) // Promise { <pending> }
}
fetchAsync()


// 2. Synchronous method
// 함수 중복 선언 문제를 피하자 (화살표 함수로 변경)
async function fetchSync () {
    const result = await axios.get("https://koreanjson.com/posts/1")
    console.log("result:", result)
}
fetchSync()



const fetchSyncwithArrow = async () =>{
    const result = await axios.get("https://koreanjson.com/posts/1")
    console.log("result:", result)
}
fetchSyncwithArrow()

