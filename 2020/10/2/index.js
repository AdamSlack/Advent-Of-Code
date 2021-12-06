const { kMaxLength } = require('buffer')
const fs = require('fs')

const fp = 'input.txt'
// const fp = 'test_input.txt'
// const fp = 'small_test_input.txt'
let jolts = fs.readFileSync(fp, 'utf-8')
  .split('\n')
  .map((line) => parseInt(line, 10))

jolts.sort((a, b) => a - b)

jolts = [0, ...jolts, jolts[jolts.length-1] + 3]

const branches = Array.from({length: jolts.length}, () => 0)
branches[0] = 1

const counts = {
  oneJolt: 0,
  twoJolt: 0,
  threeJolt: 1, // cause yo' phone is 3 higher than the highest adapter.
  lastJolt: 0,
  optionCount: 0
}

for(let i = 0; i < jolts.length; i++) {
  const jolt = jolts[i]
  let j = i - 3
  
  while (j < i) {
    if(jolts[i] - jolts[j] <= 3) {
      branches[i] += branches[j];    }
    j++
  }

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
console.log(branches[branches.length-1])