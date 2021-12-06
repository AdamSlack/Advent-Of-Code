const fs = require('fs')
// const input = fs.readFileSync('test_input.txt', 'utf-8').split('\n').filter((thing) => !!thing)
// const input = fs.readFileSync('part_2_test_input.txt', 'utf-8').split('\n').filter((thing) => !!thing)
const input = fs.readFileSync('input.txt', 'utf-8').split('\n').filter((thing) => !!thing)

const objects = Array.from(new Set([
    ...input.map((stringThing) => stringThing.split(')')[0]),
    ...input.map((stringThing) => stringThing.split(')')[1])
]))

const orbitMap = input.reduce((acc, stringThing) =>  ({
    ...acc,
    [stringThing.split(')')[1]]: stringThing.split(')')[0]
}),{})

let count = 0

const sanPath = []
const youPath = []

for(let obj of objects) {
    let thingOrbiting = obj
    while(thingOrbiting !== 'COM') {
        thingOrbiting = orbitMap[thingOrbiting]
        if(obj ==='YOU') {
            youPath.push(thingOrbiting)
        }
        if(obj ==='SAN') {
            sanPath.push(thingOrbiting)
        }
        count++
    }
}

const sanSet = new Set(sanPath)
const youSet = new Set(youPath)
const fullPath = []
const fullSet = new Set()

for(let san of sanPath) {
    fullPath.push(san)
    fullSet.add(san)
    if(youSet.has(san)) {
        break
    }
}

for(let you of youPath) {
    if(sanSet.has(you)) {
        break
    }
    else {
        fullPath.push(you)
        fullSet.add(you)    
    }
}

console.log(count)
console.log(fullPath)
console.log('JUMPS:', fullPath.length - 1)
