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

for(let i = 0; i < instructions.length; i++) {
  let acc = 0
  let iPtr = 0
  let calledInstructions = new Set()


  const modifiedInstructions = JSON.parse(JSON.stringify(instructions))

  if(modifiedInstructions[i].op === 'nop') {
    modifiedInstructions[i].op = 'jmp'
  } else if(modifiedInstructions[i].op === 'jmp') {
    modifiedInstructions[i].op = 'nop'
  }
  
  while(!calledInstructions.has(iPtr) && iPtr !== instructions.length) {
    const instruction = modifiedInstructions[iPtr]
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
    if(iPtr === i) {
    }
  }
  if(iPtr === instructions.length) {
    console.log('END! Acc = ', acc)
  }
}


