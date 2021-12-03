const { readTestInput } = require('./readTestInput')

const pos = {
  x: 0,
  y: 0,
  aim: 0
}

const movements = {
  forward: { x: 1, y: 0 },
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
}

const input = readTestInput('two', false)

const parsedInput = input.map((line) => {
  const [instruction, valString] = line.split(' ');
  return [instruction, parseInt(valString, 10)];
})

console.log(parsedInput)

parsedInput.forEach(([instruction, magnitude]) => {
  const movement = movements[instruction]
  pos.aim += magnitude*movement.y
  pos.x += magnitude*movement.x
  pos.y += magnitude*pos.aim*movement.x 

})

console.log(pos, pos.x*pos.y)