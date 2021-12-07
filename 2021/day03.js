const { readTestInput } = require('./readTestInput')

const input = readTestInput('three', false);

const getInitialBitCounts = (length) => Array.from({ length }, () => ([0, 0]))
const getBitCounts = (input) => input.reduce((acc, curr) => {
  [...curr].forEach((val, idx) => {
    acc[idx][parseInt(val, 10)] += 1
  });
  return acc;
}, getInitialBitCounts(input[0].length))


const maxIndex = (arr) => arr.lastIndexOf(Math.max(...arr))
const minIndex = (arr) => arr.indexOf(Math.min(...arr))

const getGammaRate = (bitCounts) => {
  return parseInt(bitCounts.reduce((acc, curr) => `${acc}${maxIndex(curr)}`, ''), 2);
}
// Could just get the compliment of gamma...
const getEpsilonRate = (bitCounts) => {
  return parseInt(bitCounts.reduce((acc, curr) => `${acc}${minIndex(curr)}`, ''), 2);
}

const getPowerConsumption = (input) => { 
  const bitCounts = getBitCounts(input)
  const gammaRate = getGammaRate(bitCounts);
  const epsilonRate = getEpsilonRate(bitCounts)
  return gammaRate * epsilonRate
}

const filterByBit = (input, val, bitPos) => input.filter((binString) => binString[bitPos] === `${val}`);

const getOxygenRating = (input, bitPos = 0) => {
  const bitCounts = getBitCounts(input);
  const bitVal = maxIndex(bitCounts[bitPos])
  const filteredInputs = filterByBit(input, bitVal, bitPos)
  if (filteredInputs.length === 1) {
    return parseInt(filteredInputs, 2)
  }
  else {
    return getOxygenRating(filteredInputs, bitPos+1)
  }
}

const getScrubberRating = (input, bitPos = 0) => {
  const bitCounts = getBitCounts(input);
  const bitVal = minIndex(bitCounts[bitPos])
  const filteredInputs = filterByBit(input, bitVal, bitPos)
  if (filteredInputs.length === 1) {
    return parseInt(filteredInputs[0], 2)
  }
  else {
    return getScrubberRating(filteredInputs, bitPos+1)
  }
}

const powerConsumption = getPowerConsumption(input)
const oxygenRating = getOxygenRating(input)
const scrubberRating = getScrubberRating(input)
const lifeSupportRating = oxygenRating * scrubberRating
console.log({powerConsumption, oxygenRating, scrubberRating, lifeSupportRating })