const fs = require('fs');


// const fp = './test_input.txt'
const fp = './input.txt'
const [rules, yours, nearby] = fs.readFileSync(fp, 'utf-8').split('\n\n')


const fields = []
const ranges = rules.split('\n').map((line) => {
  fields.push(line.split(': ')[0])
  return line.split(': ')[1].split(' or ')
  .map((range) => range.split('-').map((num) => parseInt(num, 10)));
})


const tickets = nearby
.split('\n')
.slice(1)
.map((line) => line.split(',').map((num) => parseInt(num, 10)))

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

const yourTicket = yours.split('\n')[1].split(',')

const potentialFields = Array.from({length: yourTicket.length}, () => {
  return JSON.parse(JSON.stringify(fields))
})

const validTickets = [yourTicket, ...tickets.filter((ticket) => ticket.every(isValid))]

let candidateFieldOrder = potentialFields.map((options, ticketIdx) => {
  return options.filter((_, fieldIdx) => {
    return validTickets.every((ticket) => {
      return withinRanges(ticket[ticketIdx], ranges[fieldIdx])
    })
  })
})

const usedFields = new Set()

while(candidateFieldOrder.flat().length !== candidateFieldOrder.length) {
  const singleFieldIdx = candidateFieldOrder.findIndex((options) => options.length === 1 && !usedFields.has(options[0]))
  candidateFieldOrder = candidateFieldOrder.map((options, idx) => {
    if(idx === singleFieldIdx) {
      return options
    }
    return options.filter((option) => option !== candidateFieldOrder[singleFieldIdx][0])
  })
  usedFields.add(candidateFieldOrder[singleFieldIdx][0])
}

const fieldOrder = candidateFieldOrder.flat() 
console.log(fieldOrder)

const vals = fieldOrder.map((field, idx) => field.startsWith('departure') ? yourTicket[idx] : 1)

console.log('Part 1:', errorRate)
console.log('part 2:', vals.reduce((acc, a) => acc * a, 1))