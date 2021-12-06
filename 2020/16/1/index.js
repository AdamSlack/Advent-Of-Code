const fs = require('fs');


const fp = './test_input.txt'
// const fp = './input.txt'
const [rules, yours, nearby] = fs.readFileSync(fp, 'utf-8').split('\n\n')


const fields = []
const ranges = rules.split('\n').map((line) => {
  fields.push(line.split(': ')[0])
  return line.split(': ')[1].split(' or ')
  .map((range) => range.split('-').map((num) => parseInt(num, 10)));
})


console.log(ranges)

const tickets = nearby
.split('\n')
.slice(1)
.map((line) => line.split(',').map((num) => parseInt(num, 10)))

console.log(tickets)

const withinRanges = (num, ranges) => ranges.some(([min, max]) => num >= min && num <= max)
const isValid = (num) => ranges.some((range) => {
  return withinRanges(num, range)
})

const errorRate = tickets.reduce((sum, ticket) =>{
  const invalids = ticket.filter((num) => !isValid(num))
  if(invalids.length) {
    return sum + invalids[0]
  }
  return sum
}, 0)

console.log('Part 1:', errorRate)
