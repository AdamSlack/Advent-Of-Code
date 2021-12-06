const fs = require('fs')


const fp = 'input.txt'
// const fp = 'test_input.txt'
const lines = fs.readFileSync(fp, 'utf-8')
  .replace(/[FL]/g, '0')
  .replace(/[BR]/g, '1')
  .split('\n')

const seatValues = lines.map((line) => ({
  fullString: line,
  val: parseInt(line, 2),
  rowString: line.slice(0,7),
  colString: line.slice(7),
  row: parseInt(line.slice(0,7), 2),
  col: parseInt(line.slice(7), 2),
}))

seatValues.sort(({val: a}, {val: b}) => b - a)

console.log('Seat with biggest ID!', seatValues[0])

seatValues.every((seat, idx) => {
  if(seatValues[idx + 1].val !== seat.val - 1) {
    console.log('Your Seat!', seat.val - 1)
    return false;
  }
  return true
});