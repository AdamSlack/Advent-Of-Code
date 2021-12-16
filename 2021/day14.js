const { readTestInput } = require('./readTestInput')

const [sequence,,...mappingLines] = readTestInput('14', false);

const mappings = mappingLines.reduce((acc, line) => {
  const [pair, insert] = line.split(' -> ')
  return {
    ...acc,
    [pair]: insert
  }
} ,{});

const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase().split('')
const pairs = cartesian(alphabet, alphabet).map((pair) => pair.join(''));

const pairCounts = pairs.reduce((acc, pair) => ({...acc, [pair]: 0 }), {})
const charCounts = alphabet.reduce((acc, char) => ({...acc, [char]: 0 }), {})

sequence.split('').forEach((char, idx) => {
  charCounts[char] += 1
  if(idx < (sequence.length-1)) {
    pairCounts[`${char}${sequence[idx+1]}`] += 1
  }
})


const MAX_STEP = 40
let currStep = 0

while(currStep < MAX_STEP) {
  const currPairs = Object.entries(pairCounts).filter(([,val]) => val > 0)
  currPairs.forEach(([pair, count]) => {
    const insert = mappings[pair];
    if(insert) {
      pairCounts[`${pair[0]}${insert}`] += count
      pairCounts[`${insert}${pair[1]}`] += count
      charCounts[insert] += count
      pairCounts[pair] -= count
    }
  })
  currStep++
}

const length = Object.entries(charCounts).reduce((sum, [,val]) => sum+val,0)
const finalCharCounts = Object.entries(charCounts).filter(([,val]) => val > 0).sort((a, b) => a[1]-b[1])
const leastCommon = finalCharCounts[0][1]
const mostCommon = finalCharCounts[finalCharCounts.length-1][1]
console.log(length, finalCharCounts)

console.log(leastCommon, mostCommon, mostCommon-leastCommon)