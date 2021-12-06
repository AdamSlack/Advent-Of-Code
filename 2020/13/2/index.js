const { time } = require('console')
const fs = require('fs')

// const fp = 'test_input.txt'
// const fp = 'test_input_two.txt'
// const fp = 'test_input_three.txt'
const fp = 'input.txt'

const lines = fs
  .readFileSync(fp, 'utf-8')
  .split('\n')

const arrivalTime = parseInt(lines[0], 10)
const busTimes = lines[1]
  .split(',')
  .map((time) => time !== 'x' ? parseInt(time, 10) : 'x')


const remainders = busTimes
  .map((time, idx) => time === 'x' ? 'x' : idx)
  .filter((time) => time !== 'x')

const times = busTimes 
  .filter((time) => time !== 'x')



const lcm = times.reduce((acc, a) => acc*a, 1)

const product = (nums) => nums.reduce((acc, a) => acc*a, 1)

const bezoutId = (a, mod) => {
  let b = a % mod;
  for (let x = 1; x < mod; x++)
  {
    if ((b * x) % mod === 1)
    {
        return x;
    }
  }
  return 1;
}


const crt = (remainders, modulo) => {
  const N = product(modulo)
  const sum = remainders.reduce((acc, r, idx) => {
    const n = Math.floor((N/modulo[idx]))
    const b = bezoutId(n, modulo[idx])
    return acc + (r*b*n)
  }, 0)
  return sum % N
}

// 626670513163231
// 953803600497198
// 541780000000309
console.log(crt([2,3,2], [3,5,7]))

console.log(lcm)

console.log(crt(remainders, times))

const answer = lcm % crt(remainders, times)
const expected = 626670513163231
console.log(expected)
console.log(answer, answer === expected ? 'Correct!' : 'Wrong :(')