// public, private, protected, readonly

class Monster2 {
    // power = 10                   => public, private, protected, readonly 중 1개라도 있으면 생략 가능

    constructor(public power: any) {
        // this.power = power       => public, private, protected, readonly 중 1개라도 있으면 생략 가능
    }

    attack1 = () => {
        console.log("lets attack")
        console.log("my attack power is " + this.power) // 안에서만 접근 가능
        this.power = 30 // 안에서 수정 가능
    }
}

// Monster 를 상속받는거
class AirMonster extends Monster2 {
    attack2 = () => {
        console.log("lets attack")
        console.log("my attack power is " + this.power) // 자식이 접근 가능
        this.power = 30 // 자식이 수정 가능
    }
}


const myMonster22 = new AirMonster(20)
myMonster22.attack1()
myMonster22.attack2()
console.log(myMonster22.power) // 밖에서 접근 가능
myMonster22.power = 10 // 밖에서 수정 가능 