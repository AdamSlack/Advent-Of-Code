
const fs = require('fs')
const { start } = require('repl')

// const fp = 'test_input.txt'
const fp = 'input.txt'
const rules = fs.readFileSync(fp, 'utf-8')
  .replace(/bags|bag| |\./g, '')
  .split('\n')
  .map((line) => {
    const [startColour, containsColours] = line.split('contain')
    return {
      [startColour]: containsColours.split(',').reduce((acc, colour) => ({
        ...acc,
        [colour.slice(1)]: parseInt(colour[0], 10)
      }) ,{})
    }
  }).reduce((acc, rule) => ({...acc, ...rule}), {})

const hasGold = (colour) => {
  const contains = rules[colour]
  if(!contains || Object.keys(contains).includes('oother')) {
    return 0
  }
  return Object.entries(contains).reduce((acc, [colour, count]) => {
    return acc + count + (count * hasGold(colour))
  },0)
}

console.log(hasGold('shinygold'))
