const { readTestInput } = require('./readTestInput');

const input = readTestInput('seven', false)[0].split(',');

const max = Math.max(...input);
const min = Math.min(...input);

let minimumFuel = Number.MAX_VALUE
let currentPos = min;

const computeFuel = (dist) => {
  return Array.from({length: dist}, (_, idx) => idx + 1 ).reduce((sum, curr) => sum+curr, 0);
}

while(currentPos <= max) {
  let bailed = false
  const currentFuelSum = input.slice(0).reduce((sum, curr, _, arr) => {
    if(sum > minimumFuel) {
      bailed = true
      arr.splice(1)
    }
    return sum + computeFuel(Math.abs(currentPos - curr))
  }, 0)  

  if(currentFuelSum < minimumFuel && !bailed) {
    minimumFuel = currentFuelSum
  }
  console.log(min, currentPos, max)
  currentPos++
}

console.log(minimumFuel)