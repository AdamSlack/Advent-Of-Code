const fs = require('fs')

// const fp = 'test_input.txt'
const fp = 'input.txt'

let layout = fs.readFileSync(fp, 'utf-8')
  .split('\n')
  .map((line) => line.split(''))

let nextLayout = JSON.parse(JSON.stringify(layout))

let hasChanged = true

const scan = (dx, dy, x, y) => {
  let i = y + dy;
  let j = x + dx;
  let hit = ' '
  
  // if(x===1 && y === 1)console.log('---', dx, dy, x, y, '---')
  while (
    hit === ' '
    && i < layout.length
    && i >= 0
    && j < layout[i].length
    && j >= 0 
  ) {
    hit = layout[i][j]
    i += dy
    j += dx
  }
  return hit
}

const wait = (ms) =>  new Promise(res => {
  setTimeout(res, ms);
})
const live = async (time) => {
  while(hasChanged) {

    await wait(time)
    console.log('\033[2J');
    layout.forEach((line) => {
      console.log(line.join(''))
    })
    // console.log(hasChanged)
    hasChanged = false
    for(let y = 0; y < layout.length; y++) {
      for(let x = 0; x < layout[y].length; x++) {
        
        // Determine Surroudings
        let adjacentOccupancyCount = 0
        for(let i = -1; i <= 1; i++){
          for(let j = -1; j <= 1; j++){
            if(i === 0 && j === 0) {
              // do nothing
            }
            else if (scan(j, i, x, y) === '#') {
              adjacentOccupancyCount++
            }
          }
        }
        // Determine Change
        // if(x===1 && y === 1) console.log(layout[y][x], adjacentOccupancyCount)
        if(layout[y][x] === '.' && adjacentOccupancyCount === 0) {
          nextLayout[y][x] = '#'
          hasChanged = true
        }
        else if(layout[y][x] === '#' && adjacentOccupancyCount >= 5) {
          nextLayout[y][x] = '.'
          hasChanged = true
        } 
      }
    }
    layout = JSON.parse(JSON.stringify(nextLayout))
  } 

  await wait(time)
  console.log('\033[2J');
  let occupancyCount = 0;
  layout.forEach((line) => {
    console.log(line.join(''))
    line.forEach((seat) => {
      if(seat === '#') {
        occupancyCount++
      }
    })
  })

  await wait(time)

  console.log('Number of occupied Seats!:', occupancyCount)
}

const time = 100;

live(time)
