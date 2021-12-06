const input = [3, 8, 1005, 8, 342, 1106, 0, 11, 0, 0, 0, 104, 1, 104, 0, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 1008, 8, 0, 10, 4, 10, 1002, 8, 1, 29, 2, 1006, 19, 10, 1, 1005, 19, 10, 2, 1102, 11, 10, 3, 8, 102, -1, 8, 10, 101, 1, 10, 10, 4, 10, 108, 1, 8, 10, 4, 10, 1001, 8, 0, 62, 2, 1009, 15, 10, 3, 8, 102, -1, 8, 10, 101, 1, 10, 10, 4, 10, 108, 1, 8, 10, 4, 10, 1002, 8, 1, 88, 2, 1101, 6, 10, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 108, 0, 8, 10, 4, 10, 102, 1, 8, 114, 1, 105, 8, 10, 1, 1102, 18, 10, 2, 6, 5, 10, 1, 2, 15, 10, 3, 8, 1002, 8, -1, 10, 101, 1, 10, 10, 4, 10, 1008, 8, 1, 10, 4, 10, 1001, 8, 0, 153, 1, 105, 15, 10, 3, 8, 1002, 8, -1, 10, 1001, 10, 1, 10, 4, 10, 108, 0, 8, 10, 4, 10, 102, 1, 8, 178, 1, 1006, 15, 10, 1006, 0, 96, 1006, 0, 35, 1, 104, 7, 10, 3, 8, 1002, 8, -1, 10, 1001, 10, 1, 10, 4, 10, 108, 0, 8, 10, 4, 10, 102, 1, 8, 214, 1006, 0, 44, 2, 1105, 17, 10, 1, 1107, 19, 10, 1, 4, 16, 10, 3, 8, 1002, 8, -1, 10, 1001, 10, 1, 10, 4, 10, 1008, 8, 0, 10, 4, 10, 102, 1, 8, 252, 1006, 0, 6, 1, 1001, 20, 10, 1006, 0, 45, 2, 1109, 5, 10, 3, 8, 1002, 8, -1, 10, 101, 1, 10, 10, 4, 10, 108, 1, 8, 10, 4, 10, 102, 1, 8, 287, 2, 101, 20, 10, 2, 1006, 18, 10, 1, 1009, 9, 10, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 108, 1, 8, 10, 4, 10, 1002, 8, 1, 321, 101, 1, 9, 9, 1007, 9, 1031, 10, 1005, 10, 15, 99, 109, 664, 104, 0, 104, 1, 21102, 48210117528, 1, 1, 21102, 1, 359, 0, 1105, 1, 463, 21102, 932700763028, 1, 1, 21102, 370, 1, 0, 1105, 1, 463, 3, 10, 104, 0, 104, 1, 3, 10, 104, 0, 104, 0, 3, 10, 104, 0, 104, 1, 3, 10, 104, 0, 104, 1, 3, 10, 104, 0, 104, 0, 3, 10, 104, 0, 104, 1, 21102, 1, 179557207079, 1, 21102, 417, 1, 0, 1105, 1, 463, 21102, 1, 28994202816, 1, 21101, 0, 428, 0, 1105, 1, 463, 3, 10, 104, 0, 104, 0, 3, 10, 104, 0, 104, 0, 21101, 0, 709580710756, 1, 21102, 1, 451, 0, 1106, 0, 463, 21102, 825016201984, 1, 1, 21101, 462, 0, 0, 1106, 0, 463, 99, 109, 2, 21201, -1, 0, 1, 21102, 40, 1, 2, 21101, 0, 494, 3, 21102, 1, 484, 0, 1105, 1, 527, 109, -2, 2106, 0, 0, 0, 1, 0, 0, 1, 109, 2, 3, 10, 204, -1, 1001, 489, 490, 505, 4, 0, 1001, 489, 1, 489, 108, 4, 489, 10, 1006, 10, 521, 1101, 0, 0, 489, 109, -2, 2105, 1, 0, 0, 109, 4, 1201, -1, 0, 526, 1207, -3, 0, 10, 1006, 10, 544, 21102, 1, 0, -3, 21202, -3, 1, 1, 22102, 1, -2, 2, 21102, 1, 1, 3, 21102, 563, 1, 0, 1105, 1, 568, 109, -4, 2106, 0, 0, 109, 5, 1207, -3, 1, 10, 1006, 10, 591, 2207, -4, -2, 10, 1006, 10, 591, 21202, -4, 1, -4, 1105, 1, 659, 22102, 1, -4, 1, 21201, -3, -1, 2, 21202, -2, 2, 3, 21102, 610, 1, 0, 1106, 0, 568, 21201, 1, 0, -4, 21102, 1, 1, -1, 2207, -4, -2, 10, 1006, 10, 629, 21102, 1, 0, -1, 22202, -2, -1, -2, 2107, 0, -3, 10, 1006, 10, 651, 21202, -1, 1, 1, 21102, 1, 651, 0, 106, 0, 526, 21202, -2, -1, -2, 22201, -4, -2, -4, 109, -5, 2106, 0, 0]

const emojiGrid = Array.from({length: 20}, () => Array.from({length: 150}, () => '⬛️'))
const grid = Array.from({length: 20}, () => Array.from({length: 150}, () => '.'))

const tiles = {
    // x: y: details
    '0': {
        '0': {
            colour: 0,
            painted: []
        }
    }
}

let x = 0
let y = 0
let dx = 0
let dy = 1

const turnRight = () => {
    if(dx === 0 && dy === 1) {
        console.log('Turning Right: N -> E')
        dx = 1
        dy = 0
    }
    else if(dx === 1 && dy === 0) {
        console.log('Turning Right: E -> S')
        dx = 0
        dy = -1
    }
    else if(dx === 0 && dy === -1) {
        console.log('Turning Right: S -> W')
        dx = -1
        dy = 0
    }
    else if(dx === -1 && dy === 0) {
        console.log('Turning Right: W -> N')
        dx = 0
        dy = 1
    }
}

const turnLeft = () => {
    if(dx === 0 && dy === 1) {
        console.log('Turning Left: N -> W')
        dx = -1
        dy = 0
    }
    else if(dx === 1 && dy === 0) {
        console.log('Turning Left: E -> N')
        dx = 0
        dy = 1
    }
    else if(dx === 0 && dy === -1) {
        console.log('Turning Left: S -> E')
        dx = 1
        dy = 0
    }
    else if(dx === -1 && dy === 0) {
        console.log('Turning Left: W -> S')
        dx = 0
        dy = -1
    }
}

const turn = (direction) => {
    direction ? turnRight() : turnLeft()
}

let steps = [[0,0]]
const move = () => {
    x += dx
    y += dy
    steps.push([x,y])
}

const paint = (colour) => {
    if(grid[y+11]) {
        if(grid[y+11][x+11]){
            grid[y+11][x+11] = colour ? '#' : '.' 
        }
    }
    if(emojiGrid[y+11]) {
        if(emojiGrid[y+11][x+11]){
            emojiGrid[y+11][x+11] = colour ? '⬜️' : '⬛️' 
        }
    }
}


const exec_program = (instructions, inputNumber) => {
    let i = 0
    let relativeBase = 0
    let programInput = inputNumber || 0
    let outputs = []
    while (i < instructions.length) {
        let op = instructions[i]
        const opString = op.toString().padStart(5, '0')
        const instruction = opString.slice(3)

        const accessModeMap = {
            '0': (offset) => instructions[instructions[i + offset]],
            '1': (offset) => instructions[i + offset],
            '2': (offset) => instructions[relativeBase + instructions[i + offset]],
        }

        const inputModeMap = {
            '0': (offset, val) => instructions[instructions[i + offset]] = val,
            '1': (offset, val) => instructions[i + offset] = val,
            '2': (offset, val) => instructions[relativeBase + instructions[i + offset]] = val,
        }


        if (instruction === '01') {
            const left = accessModeMap[opString[2]](1)
            const right = accessModeMap[opString[1]](2)
            inputModeMap[opString[0]](3, left + right)
            i += 4
        }
        else if (instruction === '02') {
            const left = accessModeMap[opString[2]](1)
            const right = accessModeMap[opString[1]](2)
            inputModeMap[opString[0]](3, left * right)
            i += 4
        }
        else if (instruction === '03') {
            const inputNum = programInput 
            inputModeMap[opString[2]](1, inputNum)
            i += 2
        }
        else if (instruction === '04') {
            outputs.push(accessModeMap[opString[2]](1))
            if(outputs.length % 2 === 0) {
                const colour = outputs[outputs.length - 2]
                const direction = outputs[outputs.length - 1]
                paint(colour)
                turn(direction)
                move()

                process.stdout.write('\033c');
                // console.log('\033[2J');
                for(const row of emojiGrid) {
                    console.log(row.join(''))
                }
                programInput = grid[y+6][x+6] === '.' ? 0 : 1 
            }
            i += 2
        }
        else if (instruction === '05') {
            const left = accessModeMap[opString[2]](1)
            const right = accessModeMap[opString[1]](2)
            if (left > 0) {
                i = right
            } else {
                i += 3
            }
        }
        else if (instruction === '06') {
            const left = accessModeMap[opString[2]](1)
            const right = accessModeMap[opString[1]](2)
            if (left === 0) {
                i = right
            } else {
                i += 3
            }
        }
        else if (instruction === '07') {
            const left = accessModeMap[opString[2]](1)
            const right = accessModeMap[opString[1]](2)
            inputModeMap[opString[0]](3, left < right ? 1 : 0)
            i += 4
        }
        else if (instruction === '08') {
            const left = accessModeMap[opString[2]](1)
            const right = accessModeMap[opString[1]](2)
            inputModeMap[opString[0]](3, left === right ? 1 : 0)
            i += 4
        }
        else if (instruction === '09') {
            const adjustment = accessModeMap[opString[2]](1)
            relativeBase += adjustment
            i += 2
        }
        else if (instruction === '99') {
            return outputs
        }
    }
}

exec_program(input, 0)

for(const row of grid) {
    console.log(row.join(''))
}


for(const row of emojiGrid) {
    console.log(row.join(''))
}