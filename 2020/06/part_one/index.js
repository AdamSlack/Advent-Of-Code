const fs = require('fs')

const fp = 'input.txt'
// const fp = 'test_input.txt'
const groupAnswerCounts = fs.readFileSync(fp, 'utf-8')
  .split('\n\n')
  .map((group) => {
    const answers = group.split('\n').flat().join('').split('')
    const count = Array.from(new Set(answers)).length
    return count
  })

const groupAnswerSum = groupAnswerCounts.reduce((acc, n) => acc + n, 0)

console.log(groupAnswerCounts)
console.log(groupAnswerSum)