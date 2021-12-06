const fs = require('fs')
const binarySearch = require('binary-search')


const fp = './input.txt'
// const fp = './test_input.txt'
const lines = fs.readFileSync(fp, 'utf-8').split('\n');
const compare = (a, b) => a - b
const numbers = lines.map((num) => parseInt(num, 10)).sort(compare)

for(idx in numbers) {
  const number = numbers[idx] 
  const numberToFind = 2020 - number
  const exists = binarySearch(numbers, numberToFind, compare ) > 0

  if(exists) {

    console.log(`
A: ${number},
B: ${numberToFind}
A * B: ${number * numberToFind}    
    `);
    break;
  }
}