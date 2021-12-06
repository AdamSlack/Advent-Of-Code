// const input = [1,9,10,3,2,3,11,0,99,30,40,50]
const input = require('./day_02.json')

const expectedOutput = 19690720

const nounLimit = 1000
const verbLimit = 1000

for(let noun = 0; noun <= nounLimit; noun++) {
    for(let verb = 0; verb <= verbLimit; verb++) {
        const opCodes = JSON.parse(JSON.stringify(input))
        opCodes[1] = noun
        opCodes[2] = verb

        for (let opCounter = 0; opCounter < opCodes.length; opCounter += 4) {

            const instruction = opCodes[opCounter]
            const leftOp = opCodes[opCounter + 1]
            const rightOp = opCodes[opCounter + 2]
            const newAddress = opCodes[opCounter + 3]

            if (instruction === 1) {
                opCodes[newAddress] = opCodes[leftOp] + opCodes[rightOp]
            } 
            else if (instruction === 2) {
                opCodes[newAddress] = opCodes[leftOp] * opCodes[rightOp]
            } 
            else if (instruction === 99) {
                if(opCodes[0] === expectedOutput) {
                    console.log('SUCCESS', opCodes.slice(0,3))
                    console.log('ANSWER =', (100*opCodes[1]) + opCodes[2])
                    return 
                }
            }
        }
    }
}

