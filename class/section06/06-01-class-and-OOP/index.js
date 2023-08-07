// class Data {
//     // const, let, var, function 같은건 안붙힘
    
//     getFullYear() {

//     }

//     getMonth() {

//     }
// }

const date = new Date() 
console.log(date.getFullYear())
console.log(date.getMonth() + 1)

// 이건 몬스터를 만드는 설명서
class Monster {
    // 앞에는 this 가 생략되어있음
    power = 10 

    // 생성자. 생성되면서 함수가 실행. 처음 만들어질때 한번 실행된다 
    constructor(attackPower) {
        this.power = attackPower
    }

    attack = () => {
        console.log("lets attack")
        console.log("my attack power is " + this.power)
    }

    run = () => {
        console.log("lets run away")
    }
}

// myMonster 는 객체 
// new Monster() 는 설명서 
const myMonster = new Monster(20)
myMonster.attack()
myMonster.run()

// 몬스터1 와는 차별되는 
const mySecondMonster = new Monster(50)
mySecondMonster.attack()
mySecondMonster.run()