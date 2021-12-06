const instructions = [3, 8, 1001, 8, 10, 8, 105, 1, 0, 0, 21, 46, 59, 80, 105, 122, 203, 284, 365, 446, 99999, 3, 9, 102, 3, 9, 9, 1001, 9, 5, 9, 102, 2, 9, 9, 1001, 9, 3, 9, 102, 4, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 101, 5, 9, 9, 1002, 9, 3, 9, 1001, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 1002, 9, 4, 9, 1001, 9, 2, 9, 102, 4, 9, 9, 101, 3, 9, 9, 102, 2, 9, 9, 4, 9, 99, 3, 9, 102, 5, 9, 9, 101, 4, 9, 9, 102, 3, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 99]
// const instructions = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0] // const signals = [4,3,2,1,0] output = 43210
// const instructions = [3,23,3,24,1002,24,10,24,1002,23,-1,23, 101,5,23,23,1,24,23,23,4,23,99,0,0]
// const instructions = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33, 1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0]

const exec_program = (firstInputNum, secondInputNum) => {
    let output
    let currentInputNum = firstInputNum

    let i = 0
    while (i < instructions.length) {
        let op = instructions[i]
        const opString = op.toString().padStart(5, '0')
        const instruction = opString.slice(3)

        if (instruction === '01') {
            const left = opString[2] === '0' ? instructions[instructions[i + 1]] : instructions[i + 1]
            const right = opString[1] === '0' ? instructions[instructions[i + 2]] : instructions[i + 2]
            const address = instructions[i + 3]
            instructions[address] = left + right
            i += 4
        }
        else if (instruction === '02') {
            const left = opString[2] === '0' ? instructions[instructions[i + 1]] : instructions[i + 1]
            const right = opString[1] === '0' ? instructions[instructions[i + 2]] : instructions[i + 2]
            const address = instructions[i + 3]
            instructions[address] = left * right
            i += 4
        }
        else if (instruction === '03') {
            instructions[instructions[i + 1]] = currentInputNum
            currentInputNum = secondInputNum
            i += 2
        }
        else if (instruction === '04') {
            output = opString[2] === '0' ? instructions[instructions[i + 1]] : instructions[i + 1]
            i += 2
        }
        else if (instruction === '05') {
            const left = opString[2] === '0' ? instructions[instructions[i + 1]] : instructions[i + 1]
            const right = opString[1] === '0' ? instructions[instructions[i + 2]] : instructions[i + 2]
            if (left > 0) {
                i = right
            } else {
                i += 3
            }
        }
        else if (instruction === '06') {
            const left = opString[2] === '0' ? instructions[instructions[i + 1]] : instructions[i + 1]
            const right = opString[1] === '0' ? instructions[instructions[i + 2]] : instructions[i + 2]
            if (left === 0) {
                i = right
            } else {
                i += 3
            }
        }
        else if (instruction === '07') {
            const left = opString[2] === '0' ? instructions[instructions[i + 1]] : instructions[i + 1]
            const right = opString[1] === '0' ? instructions[instructions[i + 2]] : instructions[i + 2]
            instructions[instructions[i + 3]] = left < right ? 1 : 0
            i += 4
        }
        else if (instruction === '08') {
            const left = opString[2] === '0' ? instructions[instructions[i + 1]] : instructions[i + 1]
            const right = opString[1] === '0' ? instructions[instructions[i + 2]] : instructions[i + 2]
            instructions[instructions[i + 3]] = left === right ? 1 : 0
            i += 4
        }
        else if (instruction === '99') {

            return output
        }
    }
}



const permutator = (inputArr) => {
    let result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr)

    return result
}

let possibleSignals = permutator([0,1,2,3,4]) 
// possibleSignals = [[4,3,2,1,0]]
// possibleSignals = [[0,1,2,3,4]]
// possibleSignals = [[1,0,4,3,2]]

const possibleOutputs = possibleSignals.map((signals) => {
    return signals.reduce((acc, signal) =>
        acc = exec_program(signal, acc)
        , 0)
})

const maximum = Math.max(...possibleOutputs)
// const maxIdx = possibleOutputs.findIndex((out) => out === maximum)
// const possibleSignals = possibleSignals[maxIdx]

console.log('Max:', maximum)


