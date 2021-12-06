const fs = require('fs')

let input = fs.readFileSync('./input.txt', 'utf-8')
const layers = input.match(/.{150}/g)

console.log('--- VALIDATION ---')
console.log('Number of layers:', layers.length)
console.log('All Layers = 25*6?',layers.every((layer) => layer.length === (25*6)))
console.log()

let minZeroDigits = 25*6
let output = -1

const charMap = {
    '2': ' ',
    '1': 'XX',
    '0': '  '
}

const countDigits = (layer, desiredDigit) => layer.reduce((acc, actualDigit) =>  desiredDigit == actualDigit ? acc + 1 : acc,0)
const zbuff = Array.from({length: 150}, () => ' ')

for(let layer of layers) {
    const digits = layer.split('')
    const zeros = countDigits(digits, 0)
    const ones = countDigits(digits, 1)
    const twos = countDigits(digits, 2)

    if(zeros < minZeroDigits) {
        output = ones * twos
        minZeroDigits = zeros
    }

    for(let i = 0; i < layer.length; i++) {
        if(zbuff[i] === ' ') {
            zbuff[i] = charMap[layer[i]]
        }
    }
}


console.log('--- PART 1 ---')
console.log('Ones * Twos:', output)
console.log()


console.log('--- PART 2 ---')

const zbuffString = zbuff.join('')
console.log('Z-Buffer string length:', zbuffString.length)
const rows = zbuffString.match(/.{50}/g)
console.log(rows)

for(const row of rows) {
    console.log(row)
}
