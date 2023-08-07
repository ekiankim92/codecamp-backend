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

// Monster 를 상속받는거
class AirMonster extends Monster {
    
    constructor(attackPower) {
        super(attackPower + 1 )
    }
    
    // 이렇게 쓰면 Monster 에서 쓴 run 함수는 무시가됨
    // overiding (부모의 run 을 덮어쓰기)
    run = () => {
        console.log("I will be running away via air")
    }
}

class GroundMonster extends Monster {
    constructor(attackPower) {
        // 받아서 부모 constructor 에 넘기고 싶다 
        super(attackPower)
    }

    run = () => {
        console.log("I will be running away via ground")
    }
}


const myMonster = new AirMonster(20)
myMonster.attack()
myMonster.run()

const mySecondMonster = new GroundMonster(50)
mySecondMonster.attack()
mySecondMonster.run()

