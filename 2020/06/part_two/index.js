const fs = require('fs')

const fp = 'input.txt'
const questions = 'abcdefghijklmnopqrstuvwxyz'.split('')

// const fp = 'test_input.txt'
// const questions = 'abcd'.split('')

const groupAnswers = fs.readFileSync(fp, 'utf-8')
  .split('\n\n')
  .map((group) => 
    group.split('\n')
    .flat()
    .map((personsAnswers) => new Set(personsAnswers.split('')))
  )


const groupAnswerCounts = groupAnswers.map((answers) => {
  return questions.reduce((acc, question) => {
    const n = answers.every((personAnswers) => personAnswers.has(question)) ? 1 : 0
    return acc + n
  }
 , 0)
})

const groupAnswersSum = groupAnswerCounts.reduce((acc, n) => acc + n, 0)

console.log(groupAnswersSum)
