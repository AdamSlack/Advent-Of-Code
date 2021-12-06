const fs = require('fs')

// const fp = 'test_input.txt'
const fp = 'input.txt'

let cmds = fs.readFileSync(fp, 'utf-8')
  .split('\n')
  .map((line) => ({
    cmd: line[0],
    val: parseInt(line.slice(1), 10)
  }))


let heading = 'E'
const pos = {
  x: 0,
  y: 0
}

const handlers = {
  N: (dist) => pos.y += dist,
  E: (dist) => pos.x += dist,
  S: (dist) => pos.y -= dist,
  W: (dist) => pos.x -= dist,
  R: (angle) => {
    const times = angle / 90
    for(let i = 0; i < times; i++) {
      if (heading === 'E') heading = 'S'
      else if (heading === 'S') heading = 'W'
      else if (heading === 'W') heading = 'N'
      else if (heading === 'N') heading = 'E'
    }
  },
  L: (angle) => {
    const times = angle / 90
    for(let i = 0; i < times; i++) {
      if (heading === 'E') heading = 'N'
      else if (heading === 'N') heading = 'W'
      else if (heading === 'W') heading = 'S'
      else if (heading === 'S') heading = 'E'
    }
  },
  F: (dist) => {
    handlers[heading](dist)
  }
}

console.log(cmds)
cmds.forEach(({cmd, val}) => {
  handlers[cmd](val)
  console.log(heading, pos)
})

const manHatDistance = (Math.abs(pos.x) + Math.abs(pos.y))

console.log('Distance:', manHatDistance)