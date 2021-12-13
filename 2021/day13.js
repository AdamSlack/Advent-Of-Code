const { readTestInput } = require('./readTestInput')

const input = readTestInput('13', false);

const coords = input
  .filter((line) => !!line && !line.startsWith('fold'))
  .map((line) => line.split(',').map((char) => parseInt(char, 10)))

const folds = input
  .filter((line) => line.startsWith('fold'))
  .map((line) => line.split(' ')[2].split('='))
  .map(([axis, number]) => ({axis, foldLineNum: parseInt(number, 10)}))

console.log({
  folds,
  coords
})

const fold = (coords, { axis, foldLineNum }) => {
  const axisList = ['x', 'y']
  const axisIndex = axisList.indexOf(axis);

  const newCoords = coords.map((coord) => {
    if(coord[axisIndex] > foldLineNum) {
      coord[axisIndex] = foldLineNum - (coord[axisIndex] - foldLineNum)
    }
    return coord
  })

  const deDupedCoords = new Set(newCoords.map(([x,y]) => `${x},${y}`));
  return Array.from(deDupedCoords).map((str) => str.split(',').map((char) => parseInt(char, 10)))
}


const applyFolds = (coords, folds) => {
  let currCoords = [...coords];
  folds.forEach((foldInstr) => {
    currCoords = fold(currCoords, foldInstr)
  })
  return currCoords
}

const foldedCoords = applyFolds(coords, folds)

const printCoords = (coords) => {
  const maxX = Math.max(...coords.map(([x]) => x))+1
  const maxY = Math.max(...coords.map(([_, y]) => y))+1

  const grid = Array(maxY).fill(0).map(() => Array(maxX).fill('⬛'));
  
  coords.forEach(([x,y]) => {
    grid[y][x] = '⬜'
    console.log
  })

  grid.forEach((line) => {
    console.log(line.join(''))
  })
}

console.log({ foldedCoords, count: foldedCoords.length })

printCoords(foldedCoords)