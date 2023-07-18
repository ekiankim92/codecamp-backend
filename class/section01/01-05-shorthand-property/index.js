function profileFunc (profileProps) {
    console.log(profileProps)
    console.log(profileProps.name)
    console.log(profileProps.age)
    console.log(profileProps.school)
}


const name = "Chulsoo"
const age = 12
const school = "SquirrelElementarySchool"

// const profile = {
//     name: name,
//     age: age,
//     school: school
// }

const profile = {name, age, school} // key 와 value 가 같아서 value 를 생략함. shorthand-property

profileFunc(profile)              // 1. 변수에 담아서 보내주기
profileFunc({name, age, school})  // 2. 그냥 통째로 보내주기
                                  // => 결과는 1번과 2번이 동일함