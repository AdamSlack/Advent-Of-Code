const fs = require('fs')


const fp = 'input.txt'
// const fp = 'test_input.txt'
const lines = fs.readFileSync(fp, 'utf-8')
  .replace(/[FL]/g, '0')
  .replace(/[BR]/g, '1')
  .split('\n')

const seatValues = lines.map((line) => ({
  fullString: line,
  fullValue: parseInt(line, 2),
  rowString: line.slice(0,7),
  colString: line.slice(7),
  row: parseInt(line.slice(0,7), 2),
  col: parseInt(line.slice(7), 2),
}))

seatValues.sort(({fullValue: a}, {fullValue: b}) => b - a)

console.log(seatValues[0])