// 타입추론
let aaa = "hello world"
aaa = 3

// 타입명시
let bbb: string = "Nice to meet you"
bbb = 10

// 타입명시가 필요한 상황
let ccc: number | string = 1000 
ccc = "1000 won"

// 숫자타입
let ddd: number = 10
ddd = "Chulsoo"

// 불린타입
let eee: boolean = true
eee = false

// 배열타입
let fff: number[] = [1,2,3,4, "hello"]
let ggg: string[] = ["1", "2", 10]
let hhh: (string | number)[] = ["paul", "chris", 22]

// 객체타입
interface IProfile {
    name: string
    age: number | string
    school: string
    hobby?: string
}

const profile: IProfile = {
    name: "Paul", 
    age: 9,
    school: "BHS"
}
profile.name = "Chris"
profile.age = "8살"
profile.hobby = "swimming"

// 함수타입 
// 함수는 타입을 추론 못함. 그래서 함수는 정해줘야함 
function add (num1: number, num2: number, unit: string): string {
    return num1 + num2 + unit
}

add(1000, 2000, "won") // 결과의 리턴 타입도 예측 가능 

// 화살표 함수
const add2 = (num1: number, num2: number, unit: string): string => {
    return num1 + num2 + unit
}

add2(1000, 2000, "won") // 결과의 리턴 타입도 예측 가능 

// any 타입 
let qqq: any = "Chulsoo" // 자바스크립트와 동일 
qqq = "Heeyoung"
qqq = 1123
qqq = true