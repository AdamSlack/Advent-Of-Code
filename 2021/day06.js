const { readTestInput } = require('./readTestInput')

const initialFishState = readTestInput('six', false)
  .join('\n')
  .split(',')

let fishDayCounts = Array(9)
  .fill(0)
  .reduce((acc, curr, idx) => ({...acc, [`${idx}`]: curr}), {});

initialFishState.forEach((days) => fishDayCounts[days] += 1)

const MAX_DAYS = 256
let currDay = 0

while(currDay < MAX_DAYS) {
  const nextDayCounts = {
    '0': fishDayCounts['1'],
    '1': fishDayCounts['2'],
    '2': fishDayCounts['3'],
    '3': fishDayCounts['4'],
    '4': fishDayCounts['5'],
    '5': fishDayCounts['6'],
    '6': fishDayCounts['0'] + fishDayCounts['7'],
    '7': fishDayCounts['8'],
    '8': fishDayCounts['0']
  }
  fishDayCounts = nextDayCounts;
  currDay += 1
}

console.log(fishDayCounts)
const count = Object.values(fishDayCounts).reduce((sum, val) => sum + parseInt(val),0)
console.log(count)
