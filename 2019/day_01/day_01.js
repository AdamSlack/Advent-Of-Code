const moduleMasses = require('./day_1.json')
// const moduleMasses = require('./day_1_test.json') // 50346 + 966 = 51312

const computeFuelForMass = (mass) => {
    return Math.floor(mass / 3) - 2
}

const computeFuelForModule = (moduleMass) => {
    const initial = computeFuelForMass(moduleMass)
    let total = initial
    let current = initial
    while (current > 0) {
        current = computeFuelForMass(current)
        if(current > 0) {
            total += current
        }
    }
    return total
}

(() => {
    const totalFuel = moduleMasses.reduce((acc, mass) => acc + computeFuelForModule(mass), 0)
    console.log(totalFuel)
})()
