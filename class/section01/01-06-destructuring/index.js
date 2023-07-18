// Destructuring example

const profile = {
    name: "Ian",
    age: 12,
    school: "BHS"
}

const { name, school } = profile
console.log(name, school)

// 1. 일반변수 전달하기 
function zzz (aaa) {
    console.log(aaa)
}

zzz("apple")

// 2. 객체 전달하기 
function zzz (aaa) {
    console.log(aaa)
    console.log(aaa.apple)
    console.log(aaa.banana)
}

const basket = {
    apple: 3,
    banana: 10
}

zzz(basket)

// 3. 객체 전달하기 구조분해할당 방식으로 전달하기 
function bbb ({apple, banana}) {
    console.log(apple)
    console.log(banana)
}

const fruits = {
    apple: 21,
    banana: 291
}

bbb(fruits)