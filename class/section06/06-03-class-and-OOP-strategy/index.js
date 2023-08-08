class AirParts {
    run = () => {
        console.log("lets run away by flying!")
    }
}

class GroundParts {
    run = () => {
        console.log("lets run away by feet")
    }
}

class Monster {
    power = 10 
    parts

    constructor(attackPower) {
        this.parts = attackPower
    }

    attack = () => {
        console.log("lets attack")
        console.log("my attack power is " + this.power)
    }

    run = () => {
        this.parts.run()
    }
}

const myMonster = new Monster(new AirParts())
myMonster.attack()
myMonster.run()

const mySecondMonster = new Monster(new GroundParts())
mySecondMonster.attack()
mySecondMonster.run()

