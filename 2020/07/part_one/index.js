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
      [startColour]: new Set(containsColours.split(',').map((colour) => colour.slice(1)))
    }
  }).reduce((acc, rule) => ({...acc, ...rule}), {})



const hasGold = (colour) => {
  const contains = rules[colour]
  if(contains === ['oother'] || !contains) {
    return false
  }
  if(contains.has('shinygold')) {
    return true
  }
  return Array.from(contains).some(hasGold)
}

const count = Object.keys(rules).reduce((acc, colour) => hasGold(colour) ? acc + 1 : acc,0)

console.log(count)