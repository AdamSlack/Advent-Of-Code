const fs = require('fs')

// const fp = 'test_input.txt'
// const preAmbleLength = 5

const fp = 'input.txt'
const preAmbleLength = 25

const nums = fs.readFileSync(fp, 'utf-8').split('\n').map((line) => parseInt(line, 10))


const isValid = (num, preAmble) => {
  for(let i = 0; i < preAmble.length; i++) {
    for(let j = i+1; j < preAmble.length; j++) {
      if(preAmble[i] + preAmble[j] === num) {
        return true
      }
    }
  }
  return false
}

for(let i = preAmbleLength; i < nums.length; i++) {
  const numToValidate = nums[i]
  if(!isValid(numToValidate, nums.slice(i-preAmbleLength, i))) {
    console.log('FOUND YOU! Number: ', numToValidate, ' Idx: ', i)
    break;
  }
}