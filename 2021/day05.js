const { readTestInput } = require('./readTestInput')

const input = readTestInput('five', false)

const lineSegments = input.map((line) => {
  const [startString, endString] = line.split(' -> ')
  return {
    start: startString.split(',').map((valString) => parseInt(valString, 10)),
    end: endString.split(',').map((valString) => parseInt(valString, 10))
  }
})

const isNotDiagonal = ({start, end}) => start[0] === end[0] || start[1] === end[1];

const plotLineSegments = (lineSegments) => {
  const plottedPoints = Array.from({length: 1000}, () => Array.from({length: 1000}, () => '.'))
  console.log(plottedPoints)
  lineSegments.forEach(({ start, end }) => {
    console.log(start, end)

    // vertical
    if(start[1] === end[1]) {
      for(let x = Math.min(start[0], end[0]); x <= Math.max(start[0], end[0]); x++) {
        if(plottedPoints[start[1]][x] === '.') {
          plottedPoints[start[1]][x] = 0
        }
        plottedPoints[start[1]][x] = plottedPoints[start[1]][x] + 1;
      }
    }
    // Horizontal
    else if(start[0] === end[0]) {
      for(let y = Math.min(start[1], end[1]); y <= Math.max(start[1], end[1]); y++){
        if(plottedPoints[y][start[0]] === '.') {
          plottedPoints[y][start[0]] = 0
        }
        plottedPoints[y][start[0]] = plottedPoints[y][start[0]] + 1;
      } 
    }
    // Diagonal
    else {
      const gradient = (end[1] - start[1]) / (end[0]-start[0])
      let y = gradient > 0 ? Math.min(start[1], end[1]) : Math.max(start[1], end[1])
      for(let x = Math.min(start[0], end[0]); x <= Math.max(start[0], end[0]); x++) {
        if(plottedPoints[y][x] === '.') {
          plottedPoints[y][x] = 0
        }
        plottedPoints[y][x] = plottedPoints[y][x] + 1;
        if(gradient > 0) {
          y++
        } else {
          y--
        }
      }
    }

  })
  return plottedPoints
}

const countOverlaps = (plottedPoints) => plottedPoints
  .flat()
  .filter((val) => val !== '.')
  .filter((val) => val > 1)
  .length

// const hvLineSegments = lineSegments.filter(isNotDiagonal)
const plottedPoints = plotLineSegments(lineSegments);
const overlaps = countOverlaps(plottedPoints);

plottedPoints.forEach((line) => {
  console.log(line.join(' '))
})
console.log(overlaps)