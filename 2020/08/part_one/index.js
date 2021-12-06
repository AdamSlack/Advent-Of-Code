const fs = require('fs')

const fp = 'input.txt'
// const fp = 'test_input.txt'
const instructions = fs.readFileSync(fp, 'utf-8').split('\n').map((line) => {
  const [op, val] = line.split(' ')
  return {
    op,
    val: parseInt(val, 10)
  }
})


let acc = 0
let iPtr = 0
let calledInstructions = new Set()

while(!calledInstructions.has(iPtr)) {
  const instruction = instructions[iPtr]
  calledInstructions.add(iPtr)
  if(instruction.op === 'acc') {
    acc = acc + instruction.val
    iPtr = iPtr + 1
  }
  else if(instruction.op === 'jmp') {
    iPtr = iPtr + instruction.val
  }
  else if(instruction.op === 'nop') {
    iPtr = iPtr + 1
  }
}

console.log('Accumulator:', acc)