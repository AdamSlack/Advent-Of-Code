const fs = require('fs')
// const input = fs.readFileSync('./test_input.txt', 'utf-8').replace(/ /g, '').split('\n').filter((str) => str !== '')
// const input = fs.readFileSync('./test_input_2.txt', 'utf-8').replace(/ /g, '').split('\n').filter((str) => str !== '')
const input = fs.readFileSync('./input.txt', 'utf-8').replace(/ /g, '').split('\n').filter((str) => str !== '')

const moons = input.map((posString) => {
    const splitPosStrs = posString.split(',')
    return {
        pos: {
            x: parseInt( splitPosStrs[0].slice(3),10),
            y: parseInt( splitPosStrs[1].slice(2),10),
            z: parseInt( splitPosStrs[2].slice(2, splitPosStrs[2].length-1),10)
        },
        vel: {
            x: 0,
            y: 0,
            z: 0
        }
    }
})

const calcChange = (a, b) => {
    if(a === b) {
        return 0
    }
    if(a < b) {
        return 1
    }
    if(a > b) {
        return -1
    }
}

const calcEnergy = (moon) => (Math.abs(moon.pos.x) + Math.abs(moon.pos.y) + Math.abs(moon.pos.z)) * (Math.abs(moon.vel.x) + Math.abs(moon.vel.y) + Math.abs(moon.vel.z)) 

let i = 1
let mas = moons // mas = Moons After Steps
let priorStates = new Set([JSON.stringify(moons)] )

let x_lcm
let z_lcm
let y_lcm

while( !x_lcm || !y_lcm || !z_lcm ) {

    mas = mas.map((moon) => ({
        ...moon,
        vel: mas.reduce((acc, {pos}) => ({
            x: acc.x + calcChange(moon.pos.x, pos.x),
            y: acc.y + calcChange(moon.pos.y, pos.y),
            z: acc.z + calcChange(moon.pos.z, pos.z)
        }), moon.vel)
    })).map((moon) => ({
        ...moon,
        pos: {
            x: moon.pos.x + moon.vel.x,
            y: moon.pos.y + moon.vel.y,
            z: moon.pos.z + moon.vel.z
        }
    }))
    
    if(!(i%10000)) {
        console.log('STEP NUMBER:', i)
    }

    const stringifiedSystem = JSON.stringify(mas)

    if(i === 10 || i === 100 || i === 1000) {
        const totalEnergy = mas.reduce((acc, moon) => acc + calcEnergy(moon), 0)
        console.log('TOTAL ENERGY ON STEP:', i, 'IS', totalEnergy)
    }
    if(priorStates.has(stringifiedSystem)) {
        console.log(`I'VE SEEN THIS BEFORE!!! STEP NUMBER ${i}!!!`)
        return
    }
    if(mas.every(m => m.vel.x === 0) && ! x_lcm) {
        x_lcm = i
    }
    if(mas.every(m => m.vel.y === 0) && ! y_lcm) {
        y_lcm = i
    }
    if(mas.every(m => m.vel.z === 0) && ! z_lcm) {
        z_lcm = i
    }
    priorStates.add(stringifiedSystem)
    // console.log(`\n\n STEP NUMBER ${i}:`)
    // console.log(mas)
    i++
}

console.log('(', x_lcm, '*', y_lcm, '*', z_lcm, ') / 2', '=', (x_lcm*y_lcm*z_lcm)/2)

