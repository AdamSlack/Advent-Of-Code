const { readTestInput } = require('./readTestInput');

const input = readTestInput('one', false)
  .map((valString) => parseInt(valString, 10))

const computeDepthWindows = (depths, windowSize = 3) => {
  const windowSum = []
  for(let i = 0; i < depths.length + 1 - windowSize; i++) {
    const window = depths.slice(i, i+windowSize)
    windowSum.push(window.reduce((acc, val) => acc+val, 0))
  }
  return windowSum
}

const hasIncreased = (current, previous) => {
  return current > previous
}

const compareDepths = (depths) => {
  const depthIncreases = [null];
  for(let i = 1; i < depths.length; i++) {
    depthIncreases.push(hasIncreased(depths[i], depths[i-1]))
  }
  return depthIncreases
}

const depthWindows = computeDepthWindows(input);
const increases = compareDepths(depthWindows);
const totalIncreases = increases
  .reduce((acc, hasIncreased) => acc + (hasIncreased ? 1 : 0), 0)

console.log()
// console.log(increases)
console.log(totalIncreases)