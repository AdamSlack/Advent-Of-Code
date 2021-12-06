const { kMaxLength } = require('buffer')
const fs = require('fs')

// const fp = 'input.txt'
// const fp = 'test_input.txt'
const fp = 'small_test_input.txt'
const jolts = fs.readFileSync(fp, 'utf-8')
  .split('\n')
  .map((line) => parseInt(line, 10))

jolts.sort((a, b) => a - b)

const counts = {
  oneJolt: 0,
  twoJolt: 0,
  threeJolt: 1, // cause yo' phone is 3 higher than the highest adapter.
  lastJolt: 0,
  optionCount: 0
}

for(let i = 0; i < jolts.length; i++) {
  const jolt = jolts[i]
  if(jolt === counts.lastJolt + 1) {
      counts.oneJolt += 1,
      counts.lastJolt = jolt
  }
  if(jolt === counts.lastJolt + 3) {
    counts.threeJolt += 1,
    counts.lastJolt = jolt
  }
  if(jolt === counts.lastJolt + 2) {
    counts.twoJolt += 1
    counts.lastJolt = jolt
  }
}

console.log(counts)
console.log('Answer:', counts.oneJolt * counts.threeJolt)