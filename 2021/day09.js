const { readTestInput } = require('./readTestInput');

const testInput = readTestInput('09', false).map((line) => line.split(''));

const floodFill = (data, x, y, newValue) => {
  const visitedSet = new Set();
  const pointsToVisit = [{x:x, y:y}];

  while (pointsToVisit.length) {
    const { x, y } = pointsToVisit.shift()
    
    if (data[y][x] !== '9' && !visitedSet.has(`${x},${y}`)) {
        data[y][x] = newValue;
        // up
        if (y > 0) {
          pointsToVisit.push({y:y-1, x:x})
        }
        // down
        if (y + 1 < data.length) {
          pointsToVisit.push({y:y+1, x:x})
        }
        // left
        if (x > 0) {
          pointsToVisit.push({y:y, x:x-1});
        }
        // right
        if (x + 1 < data[y].length) {
          pointsToVisit.push({y:y, x:x+1});
        }
        visitedSet.add(`${x},${y}`)
    }
  }

  return data;
}

const getBasinSize = (pointGrid, x, y) => {
  const gridCopy = JSON.parse(JSON.stringify(pointGrid));
  const newGrid = floodFill(gridCopy, x, y, 'X')
  const basinSize = newGrid.reduce((basinSum, line) => {
    return basinSum + line.reduce((lineSum, curr) => {
      return lineSum + (curr === 'X' ? 1 : 0)
    }, 0)
  },0)

  return basinSize
}

const getLowPoints = (pointGrid) => {
  const lowPoints = [];
  const basinSizes = [];
  for(let y = 0; y < pointGrid.length; y++) {
    for(let x = 0; x < pointGrid[y].length; x++) {
      const curr = pointGrid[y][x]
      const adjacentPoints = {
        left: pointGrid[y][x-1],
        right: pointGrid[y][x+1],
        top: pointGrid[y-1] && pointGrid[y-1][x],
        bottom: pointGrid[y+1] && pointGrid[y+1][x],
      }
      const isLowPoint = !Object.values(adjacentPoints)
        .some((adjPoint) => !!adjPoint && adjPoint <= curr)
      
      if(isLowPoint) {
        lowPoints.push(curr)
        basinSizes.push(getBasinSize(pointGrid, x, y))
      }
    }
  }
  basinSizes.sort((a,b) => b-a)
  return {lowPoints, basinSizes}
}

const getRiskLevel = (lowPoints) => lowPoints.reduce((sum, curr) => sum+1+parseInt(curr, 10),0)

const { lowPoints, basinSizes } = getLowPoints(testInput)
const riskLevel = getRiskLevel(lowPoints)

console.log(lowPoints)
console.log(riskLevel)
console.log(basinSizes)
console.log(basinSizes[0] * basinSizes[1] * basinSizes[2])

