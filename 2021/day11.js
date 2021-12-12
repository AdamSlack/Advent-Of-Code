const { readTestInput } = require('./readTestInput')

const levels = readTestInput('11', false)
.map((line) => line.split('').map((char) => {
  return { energy: parseInt(char, 10), hasFlashed: false }
}))

const printLevels = (levels, step) => {
  console.log(` -- ${step} -- `)
  levels.forEach((line) => {
    console.log(line.map(({energy}) => energy).join(''))
  })
  console.log(` -- ${step} -- `)
}

let flashCount = 0;

const charge = (x, y) => {  
  // charge if not already flashed
  if(!levels[y][x].hasFlashed) {
    levels[y][x].energy += 1;
  }
  
  // flash if it can and hasn't already.
  if(levels[y][x].hasFlashed || levels[y][x].energy < 10) {
    return;
  }

  levels[y][x].hasFlashed = true
  levels[y][x].energy = 0
  flashCount += 1;

  // charge adgjacent octo's
  if(x > 0 && y > 0) {
    charge(x-1, y-1)
  }
  if(x > 0) { 
    charge(x-1, y)
  }
  if(x > 0 && y < levels.length-1) {
    charge(x-1, y+1)
  }
  if(x < levels[y].length - 1) {
    charge(x+1, y)
  }
  if(y > 0) {
    charge(x, y-1)
  }
  if(y < levels.length-1) {
    charge(x, y + 1)
  }
  if(x < levels[y].length - 1 && y > 0) {
    charge(x+1, y-1)
  }
  if(x < levels[y].length - 1 && y < levels.length-1) {
    charge(x+1, y+1)
  }
}

const MAX_STEPS = 1000;
let currStep = 0;

printLevels(levels, currStep+1)

while(currStep < MAX_STEPS) {
  for(let y = 0; y < levels.length; y++ ) {
    for(let x = 0; x < levels[y].length; x++ ) {
      charge(x, y)
    }
  }

  for(let y = 0; y < levels.length; y++ ) {
    for(let x = 0; x < levels[y].length; x++ ) {
      levels[y][x].hasFlashed = false
    }
  }

  if(flashCount == (levels.length * levels[0].length)) {
    console.log('SYNC:', currStep+1);
    break
  }

  printLevels(levels, currStep+1)
  currStep += 1;
  flashCount = 0
}

console.log(flashCount)