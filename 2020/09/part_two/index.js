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

let invalidNum = null
let invalidNumIdx = null

for(let i = preAmbleLength; i < nums.length; i++) {
  const numToValidate = nums[i]
  if(!isValid(numToValidate, nums.slice(i-preAmbleLength, i))) {
    console.log('FOUND YOU! Number: ', numToValidate, ' Idx: ', i)
    invalidNum = numToValidate
    invalidNumIdx = i
    break;
  }
}


for(let i = 0; i < invalidNumIdx; i++) {
  const sumNums = [nums[i]]
  let sum = nums[i]
  for (let j = i+1; j < invalidNumIdx && sum < invalidNum; j++) {
    sumNums.push(nums[j])
    sum += nums[j]
    if(sum === invalidNum) {
      sumNums.sort()
      const largest = sumNums[sumNums.length - 1]
      const smallest = sumNums[0]
      console.log('Found.', 'largest:', largest, 'smallest:', smallest, 'Added together:', smallest + largest)
    }
  }
}