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
const shipPos = {
  x: 0,
  y: 0
}

let waypointPos = {
  x: 10,
  y: 1,
}

const handlers = {
  N: (dist) => waypointPos.y += dist,
  E: (dist) => waypointPos.x += dist,
  S: (dist) => waypointPos.y -= dist,
  W: (dist) => waypointPos.x -= dist,
  R: (angle) => {
    const times = angle / 90
    for(let i = 0; i < times; i++) {
      waypointPos = { x: waypointPos.y, y: waypointPos.x * -1 }
    }
  },
  L: (angle) => handlers['R'](360 - angle),
  F: (dist) => {
    shipPos.x += (waypointPos.x * dist)
    shipPos.y += (waypointPos.y * dist)
  }
}
cmds.forEach(({cmd, val}) => {
  handlers[cmd](val)
})

const manHatDistance = (Math.abs(shipPos.x) + Math.abs(shipPos.y))

console.log('Distance:', manHatDistance)