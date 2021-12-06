const fs = require('fs')

const fp = './input.txt'
// const fp = './test_input.txt'
const lines = fs.readFileSync(fp, 'utf-8').split('\n');
const compare = (a, b) => a - b
const numbers = lines.map((num) => parseInt(num, 10)).sort(compare)


numbers.forEach((numA) => {
  numbers.forEach((numB) => {
    numbers.forEach((numC) => {
      if(numA + numB + numC === 2020) {
        console.log(numA * numB * numC)
        return 0;
      }
    })
  })
})