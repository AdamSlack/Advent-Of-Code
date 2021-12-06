const fs = require('fs')

// const fp = 'test_input.txt'
const fp = 'input.txt'

let layout = fs.readFileSync(fp, 'utf-8')
  .split('\n')
  .map((line) => line.split(''))

let nextLayout = JSON.parse(JSON.stringify(layout))

let hasChanged = true

while(hasChanged) {
  // layout.forEach((line) => {
  //   console.log(JSON.stringify(line))
  // })
  // console.log(hasChanged)
  hasChanged = false
  for(let y = 0; y < layout.length; y++) {
    for(let x = 0; x < layout[y].length; x++) {
      
      // Determine Surroudings
      let adjacentOccupancyCount = 0
      for(let i = y-1; i <= y + 1; i++){
        for(let j = x-1; j <= x + 1; j++){
          if(i < 0 || i === layout.length || j < 0 || j === layout[i].length){
            // do nothing
          }
          else if (i === y && j === x) {
            // do nothing
          }
          else if (layout[i][j] === '#') {
            adjacentOccupancyCount++
          }
        }
      }
      // Determine Change
      if(layout[y][x] === 'L' && adjacentOccupancyCount === 0) {
        nextLayout[y][x] = '#'
        hasChanged = true
      }
      else if(layout[y][x] === '#' && adjacentOccupancyCount >= 4) {
        nextLayout[y][x] = 'L'
        hasChanged = true
      } 
    }
  }
  layout = JSON.parse(JSON.stringify(nextLayout))
} 

let occupancyCount = 0;
layout.forEach((line) => {
  // console.log(JSON.stringify(line))
  line.forEach((seat) => {
    if(seat === '#') {
      occupancyCount++
    }
  })
})

console.log(occupancyCount)