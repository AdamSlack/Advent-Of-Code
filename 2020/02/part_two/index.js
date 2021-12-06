const fs = require('fs')

const fp = './input.txt'
// const fp = './test_input.txt'
const lines = fs.readFileSync(fp, 'utf-8').split('\n').filter((line) => !!line)

const passwordAndRules = lines.map((line) => {
  const segments = line.replace(':', '').replace('-', ' ').split(' ');
  return {
    min: parseInt(segments[0], 10),
    max: parseInt(segments[1], 10),
    letter: segments[2],
    password: segments[3],
  }
})


const numberOfValid = passwordAndRules.reduce((acc, pass) => {
  const { password, letter, min, max} = pass
  console.log(pass)
  const minMatch = password[min-1] === letter
  const maxMatch = password[max-1] === letter

  if ((minMatch || maxMatch) && !(minMatch && maxMatch)) {
    return acc += 1
  }
  return acc
}, 0);

 console.log('Number of valid passwords:', numberOfValid)