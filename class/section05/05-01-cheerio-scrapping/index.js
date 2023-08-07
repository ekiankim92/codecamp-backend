import axios from "axios"
import cheerio from "cheerio"

// 디스코드나 슬랙에서 OG 를 받을수 있게끔 만들어주는 코드 
const createMessage = async () => {
    // 입력된 메세지: "안녕하세요~ https://www.naver.com 에 방문해 주세요"

    // 1. 입력된 메시지에서 http 로 시작하는 문장이 있는지 먼저 찾기 (.find() 등의 알고리즘 사용하기)
    const url = "https://www.naver.com"

    // 2. axios.get() 으로 요청해서 html 코드 받아오기 => 스크래핑
    const result = await axios.get(url)
    console.log("result:", result.data)

    // 3. 스크래핑 결과에서 OG(오픈그래프) 코드를 골라내서 변수에 담기 => cheerio 도움 받기 
    const $ = cheerio.load(result.data)
    // map 과는 달리 each (cheerio 에서 제공) idx 가 먼저 들어오고 el 이 두번쨰로 들어옴 
    $("meta").each((idx, el) => {
        if ($(el).attr("property") && $(el).attr("property").includes("og:")) {
            const key = $(el).attr("property") // og:title, og:description, ...
            const value = $(el).attr("content") // 해당 내용 
            console.log("key, value:", key, value)
        }
    })
}

createMessage()