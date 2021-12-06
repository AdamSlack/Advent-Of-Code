const fs = require('fs')

// const fp = 'test_input.txt'
const fp = 'input.txt'

let lines = fs.readFileSync(fp, 'utf-8')
  .split('\n')

let mask = 'X'.repeat(36)
const instructions = lines.reduce((acc, line) => {
  if(line.slice(0,4) === 'mask') {
    mask = line.replace('mask = ', '')
    return acc
  } else {
    const [addr, val] = line
    .replace('mem[', '')
    .replace(']', '')
    .split(' = ')
    const valString = parseInt(val, 10).toString(2).padStart(36, '0').split('')
    const maskedString = valString
      .map((char, idx) => mask[idx] !== 'X' 
        ? mask[idx]
        : char).join('')
    return [
      ...acc,
      { addr, val: parseInt(maskedString, 2) }
    ]
  }
}, [])

const register = instructions.reduce((reg, instr) => ({
  ...reg,
  [instr.addr]: instr.val
}), {})

const sum = Object.values(register).reduce((acc, a) => acc + a,0)

console.log(mask)
console.log(instructions)
console.log(sum)